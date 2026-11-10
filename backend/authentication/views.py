import secrets
from datetime import timedelta

from django.contrib.auth.hashers import check_password, make_password
from django.conf import settings
from django.core.mail import send_mail
from django.db import transaction
from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from .models import EmailOTP, User
from .serializers import (
  LogoutSerializer,
  SendOTPSerializer,
  UserLoginSerializer,
  UserRegistrationSerializer,
  UserSerializer,
  VerifyOTPSerializer,
)

OTP_LIFETIME = timedelta(minutes=10)
OTP_RESEND_DELAY = timedelta(seconds=60)
OTP_MAX_ATTEMPTS = 5


def consume_email_verification(email, verification_token):
  verification = (
    EmailOTP.objects.select_for_update()
    .filter(email__iexact=email)
    .first()
  )

  if (
    verification is None
    or verification.verified_at is None
    or verification.expires_at <= timezone.now()
    or not check_password(verification_token, verification.verification_token_hash)
  ):
    return False

  verification.delete()
  return True


class SendOTPView(APIView):

  permission_classes = [AllowAny]

  def post(self, request):
    serializer = SendOTPSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.validated_data['email'].strip().lower()
    now = timezone.now()
    code = f'{secrets.randbelow(1_000_000):06d}'

    # if settings.DEBUG:
    #   print(f'Development OTP for {email}: {code}', flush=True)

    with transaction.atomic():
      verification = (
        EmailOTP.objects.select_for_update()
        .filter(email__iexact=email)
        .first()
      )

      if verification and now - verification.created_at < OTP_RESEND_DELAY:
        retry_after = int((OTP_RESEND_DELAY - (now - verification.created_at)).total_seconds())
        return Response(
          {'detail': 'Please wait before requesting another code.'},
          status=status.HTTP_429_TOO_MANY_REQUESTS,
          headers={'Retry-After': str(max(retry_after, 1))},
        )

      if verification is None:
        verification = EmailOTP(email=email)

      verification.code_hash = make_password(code)
      verification.created_at = now
      verification.expires_at = now + OTP_LIFETIME
      verification.attempts = 0
      verification.verified_at = None
      verification.verification_token_hash = ''
      verification.save()

      send_mail(
        'Your eCart verification code',
        f'Your eCart verification code is {code}. It expires in 10 minutes.',
        None,
        [email],
        fail_silently=False,
      )

    return Response(
      {'detail': 'A verification code has been sent if this address can receive email.'},
      status=status.HTTP_200_OK,
    )


class VerifyOTPView(APIView):

  permission_classes = [AllowAny]

  def post(self, request):
    serializer = VerifyOTPSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.validated_data['email'].strip().lower()
    code = serializer.validated_data['code']
    now = timezone.now()

    with transaction.atomic():
      verification = (
        EmailOTP.objects.select_for_update()
        .filter(email__iexact=email)
        .first()
      )

      if verification is None or verification.expires_at <= now:
        return Response(
          {'detail': 'The code is invalid or expired. Request a new code.'},
          status=status.HTTP_400_BAD_REQUEST,
        )

      if verification.verified_at is not None:
        return Response(
          {'detail': 'This code has already been verified. Request a new code.'},
          status=status.HTTP_400_BAD_REQUEST,
        )

      if verification.attempts >= OTP_MAX_ATTEMPTS:
        return Response(
          {'detail': 'Too many incorrect attempts. Request a new code.'},
          status=status.HTTP_429_TOO_MANY_REQUESTS,
        )

      if not check_password(code, verification.code_hash):
        verification.attempts += 1
        verification.save(update_fields=['attempts'])
        return Response(
          {'detail': 'The code is incorrect.'},
          status=status.HTTP_400_BAD_REQUEST,
        )

      verification_token = secrets.token_urlsafe(32)
      verification.verified_at = now
      verification.verification_token_hash = make_password(verification_token)
      verification.save(update_fields=['verified_at', 'verification_token_hash'])
      is_new_user = not User.objects.filter(email__iexact=email).exists()

    return Response(
      {
        'verified': True,
        'is_new_user': is_new_user,
        'verification_token': verification_token,
      },
      status=status.HTTP_200_OK,
    )


class UserRegistrationView(APIView):

  def post(self, request):
    serializer = UserRegistrationSerializer(data=request.data)

    serializer.is_valid(raise_exception=True)

    with transaction.atomic():
      if not consume_email_verification(
        serializer.validated_data['email'],
        serializer.validated_data['verification_token'],
      ):
        return Response(
          {'verification_token': 'Verify your email address before creating an account.'},
          status=status.HTTP_400_BAD_REQUEST,
        )

      user = serializer.save()
      refresh = RefreshToken.for_user(user)

    return Response(
      {
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'user': UserSerializer(user).data,
      },
      status=status.HTTP_201_CREATED,
    )


class UserLoginView(APIView):

  def post(self, request):
    serializer = UserLoginSerializer(data=request.data)

    serializer.is_valid(raise_exception=True)

    data = serializer.validated_data

    if data['verification_token']:
      with transaction.atomic():
        if not consume_email_verification(
          serializer.validated_data['email'],
          data['verification_token'],
        ):
          return Response(
            {'detail': 'Verify your email address before signing in.'},
            status=status.HTTP_400_BAD_REQUEST,
          )

    return Response(
      {
        'access': data['access'],
        'refresh': data['refresh'],
        'user': UserSerializer(data['user']).data,
      },
      status=status.HTTP_200_OK,
    )


class LogoutView(APIView):

  permission_classes = [IsAuthenticated]

  def post(self, request):
    serializer = LogoutSerializer(data=request.data)

    serializer.is_valid(raise_exception=True)

    try:
      serializer.save()
    except TokenError:
      return Response(
        {'detail': 'Invalid or expired refresh token.'},
        status=status.HTTP_400_BAD_REQUEST,
      )

    return Response(
      {'detail': 'Successfully logged out.'},
      status=status.HTTP_205_RESET_CONTENT,
    )


class UserProfileView(APIView):

  permission_classes = [IsAuthenticated]

  def get(self, request):
    serializer = UserSerializer(request.user)

    return Response(
      serializer.data,
      status=status.HTTP_200_OK,
    )

  def patch(self, request):
    serializer = UserSerializer(
      request.user,
      data=request.data,
      partial=True,
    )
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(
      serializer.data,
      status=status.HTTP_200_OK,
    )
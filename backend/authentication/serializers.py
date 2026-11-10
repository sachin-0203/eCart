from django.contrib.auth.hashers import check_password
from django.contrib.auth.password_validation import validate_password
from django.utils import timezone
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import EmailOTP, User


def has_valid_email_verification(email, verification_token):
  try:
    verification = EmailOTP.objects.get(email__iexact=email)
  except EmailOTP.DoesNotExist:
    return False

  return (
    verification.verified_at is not None
    and verification.expires_at > timezone.now()
    and check_password(verification_token, verification.verification_token_hash)
  )


class SendOTPSerializer(serializers.Serializer):
  email = serializers.EmailField()


class VerifyOTPSerializer(serializers.Serializer):
  email = serializers.EmailField()
  code = serializers.RegexField(r'^\d{6}$')


class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = [
      'id',
      'username',
      'email',
      'phone_number',
      'first_name',
      'last_name',
    ]
    read_only_fields = [
      'id'
    ]

  def validate_email(self, value):
    user_id = self.instance.pk if self.instance else None
    if User.objects.filter(email__iexact=value).exclude(pk=user_id).exists():
      raise serializers.ValidationError('A user with this email already exists.')
    return value


class UserRegistrationSerializer(serializers.ModelSerializer):

  password = serializers.CharField(
    write_only=True,
    validators=[validate_password]
  )

  password2 = serializers.CharField(
    write_only=True
  )

  class Meta:
    model = User
    fields = [
      'username',
      'email',
      'phone_number',
      'password',
      'password2',
      'verification_token',
    ]

  verification_token = serializers.CharField(write_only=True)

  def validate_email(self, value):
    if User.objects.filter(email__iexact=value).exists():
      raise serializers.ValidationError('A user with this email already exists.')
    return value

  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError({
        'password': 'Passwords do not match.'
      })

    if not has_valid_email_verification(attrs['email'], attrs['verification_token']):
      raise serializers.ValidationError({
        'verification_token': 'Verify your email address before creating an account.'
      })

    return attrs

  def create(self, validated_data):
    validated_data.pop('password2')
    validated_data.pop('verification_token')
    user = User.objects.create_user(**validated_data)
    return user


class UserLoginSerializer(serializers.Serializer):
  email = serializers.EmailField()
  password = serializers.CharField(write_only=True, required=False)
  verification_token = serializers.CharField(write_only=True, required=False)

  def validate(self, attrs):
    user = User.objects.filter(email__iexact=attrs['email']).first()

    password = attrs.get('password')
    verification_token = attrs.get('verification_token')
    if bool(password) == bool(verification_token):
      raise serializers.ValidationError({
        'detail': 'Provide either a password or a verified email token.'
      })

    if verification_token and (
      user is None or not has_valid_email_verification(attrs['email'], verification_token)
    ):
      raise serializers.ValidationError({
        'detail': 'Verify your email address before signing in.'
      })

    if password and (user is None or not user.check_password(password)):
      raise serializers.ValidationError({
        'detail': 'Invalid email or password.'
      })

    refresh = RefreshToken.for_user(user)

    return {
      'email': attrs['email'],
      'user': user,
      'access': str(refresh.access_token),
      'refresh': str(refresh),
      'verification_token': verification_token,
    }


class LogoutSerializer(serializers.Serializer):

  refresh = serializers.CharField()

  def validate(self, attrs):
    self.token = attrs['refresh']
    return attrs

  def save(self, **kwargs):
    token = RefreshToken(self.token)
    token.blacklist()

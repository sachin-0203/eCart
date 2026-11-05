from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import (
  LogoutSerializer,
  UserLoginSerializer,
  UserRegistrationSerializer,
  UserSerializer,
)


class UserListView(APIView):

  def get(self, request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


class UserRegistrationView(APIView):

  def post(self, request):
    serializer = UserRegistrationSerializer(data=request.data)

    if not serializer.is_valid():
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

    if not serializer.is_valid():
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    data = serializer.validated_data

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
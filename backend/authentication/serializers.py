from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User


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
    ]

  def validate_email(self, value):
    if User.objects.filter(email__iexact=value).exists():
      raise serializers.ValidationError('A user with this email already exists.')
    return value

  def validate(self, attrs):
    if attrs['password'] != attrs['password2']:
      raise serializers.ValidationError({
        'password': 'Passwords do not match.'
      })

    return attrs

  def create(self, validated_data):
    validated_data.pop('password2')
    user = User.objects.create_user(**validated_data)
    return user


class UserLoginSerializer(serializers.Serializer):
  email = serializers.EmailField()
  password = serializers.CharField(write_only=True)

  def validate(self, attrs):
    user = User.objects.filter(email__iexact=attrs['email']).first()

    if user is None or not user.check_password(attrs['password']):
      raise serializers.ValidationError({
        'detail': 'Invalid email or password.'
      })

    refresh = RefreshToken.for_user(user)

    return {
      'user': user,
      'access': str(refresh.access_token),
      'refresh': str(refresh),
    }


class LogoutSerializer(serializers.Serializer):

  refresh = serializers.CharField()

  def validate(self, attrs):
    self.token = attrs['refresh']
    return attrs

  def save(self, **kwargs):
    token = RefreshToken(self.token)
    token.blacklist()


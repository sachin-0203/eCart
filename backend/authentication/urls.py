from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
  LogoutView,
  SendOTPView,
  UserLoginView,
  UserProfileView,
  UserRegistrationView,
  VerifyOTPView,
)

urlpatterns = [

  path('otp/send/', SendOTPView.as_view(), name='send-otp'),

  path('otp/verify/', VerifyOTPView.as_view(), name='verify-otp'),

  path('register/', UserRegistrationView.as_view(), name='register'),

  path('login/', UserLoginView.as_view(), name='user-login'),

  path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),

  path('logout/', LogoutView.as_view(), name='logout'),

  path('profile/', UserProfileView.as_view(), name='user-profile'),

]
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
  LogoutView,
  UserListView,
  UserLoginView,
  UserProfileView,
  UserRegistrationView,
)

urlpatterns = [

  path('register/', UserRegistrationView.as_view(), name='register'),

  path('users/', UserListView.as_view(), name='user-list'),

  path('login/', UserLoginView.as_view(), name='user-login'),

  path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),

  path('logout/', LogoutView.as_view(), name='logout'),

  path('profile/', UserProfileView.as_view(), name='user-profile'),

]
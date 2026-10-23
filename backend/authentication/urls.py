from django.urls import path

from .views import UserListView


urlpatterns = [
  path('auth/', UserListView.as_view(), name="user-List" )
]
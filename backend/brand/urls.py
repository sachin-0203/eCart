from rest_framework.urls import path

from .views import BrandCreateListAPI, BrandDetailView


urlpatterns = [
  path('brand/', BrandCreateListAPI.as_view(), name='brand-list-create'),
  path('brand/<int:pk>/', BrandDetailView.as_view(), name='brand-detail')
]
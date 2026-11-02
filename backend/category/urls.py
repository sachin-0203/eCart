from django.urls import path
from .views import CategoryListCreateAPI, CategoryDetailAPI

urlpatterns = [
    path("category/", CategoryListCreateAPI.as_view(), name="category-list-create"),
    path("category/<int:pk>/", CategoryDetailAPI.as_view(), name="category-detail"),
]
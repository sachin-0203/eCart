from rest_framework import generics
from .models import Category
from .serializers import CategoryDetailSerializer, CategorySerializer


class CategoryListCreateAPI(generics.ListCreateAPIView):
  serializer_class = CategorySerializer

  def get_queryset(self):
    return Category.objects.filter(is_active=True)


class CategoryDetailAPI(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = CategoryDetailSerializer
  queryset = Category.objects.all()
  lookup_field = "slug"
from rest_framework import generics
from .models import Category
from .serializers import CategorySerializer


class CategoryListCreateAPI(generics.ListCreateAPIView):
  serializer_class = CategorySerializer

  def get_queryset(self):
    queryset = Category.objects.all()
    if self.request.query_params.get("include_inactive") != "true":
      queryset = queryset.filter(is_active=True)
    return queryset


class CategoryDetailAPI(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = CategorySerializer
  queryset = Category.objects.all()
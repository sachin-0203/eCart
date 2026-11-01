from rest_framework import generics

from .serializers import BrandSerializer
from .models import Brand


class BrandCreateListAPI(generics.ListCreateAPIView):
  serializer_class = BrandSerializer

  def get_queryset(self):
    return Brand.objects.filter(is_active=True)


class BrandDetailView(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = BrandSerializer
  queryset = Brand.objects.all()
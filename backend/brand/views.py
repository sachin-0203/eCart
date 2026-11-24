from rest_framework import generics

from .serializers import BrandSerializer
from .models import Brand


class BrandCreateListAPI(generics.ListCreateAPIView):
  serializer_class = BrandSerializer

  def get_queryset(self):
    queryset = Brand.objects.all()
    if self.request.query_params.get("include_inactive") != "true":
      queryset = queryset.filter(is_active=True)
    return queryset


class BrandDetailView(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = BrandSerializer
  queryset = Brand.objects.all()
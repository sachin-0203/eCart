
from rest_framework.viewsets import ModelViewSet
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Product, ProductImage
from .serializers import ProductSerializer, ProductImageSerializer


class ProductViewSet(ModelViewSet):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer
  lookup_field = "pk"
  lookup_value_regex = "[^/.]+"

  def get_object(self):
    queryset = self.filter_queryset(self.get_queryset())
    lookup = self.kwargs.get(self.lookup_url_kwarg or self.lookup_field)
    if lookup.isdecimal():
      product = get_object_or_404(queryset, pk=lookup)
    else:
      product = get_object_or_404(queryset, slug=lookup)
    self.check_object_permissions(self.request, product)
    return product

  def get_queryset(self):
    queryset = super().get_queryset()
    slug = self.request.query_params.get("slug")
    return queryset.filter(slug=slug) if slug else queryset

  @action(detail=False, methods=["get"], url_path="slug/(?P<slug>[^/.]+)")
  def get_by_slug(self, request, slug=None):
    product = get_object_or_404(self.get_queryset(), slug=slug)
    serializer = self.get_serializer(product)
    return Response(serializer.data)


class ProductImageUploadView(generics.CreateAPIView):
  queryset = ProductImage.objects.all()
  serializer_class = ProductImageSerializer
  parser_classes = [MultiPartParser, FormParser]


class ProductImageViewSet(ModelViewSet):
  queryset = ProductImage.objects.select_related("product")
  serializer_class = ProductImageSerializer
  parser_classes = [MultiPartParser, FormParser]
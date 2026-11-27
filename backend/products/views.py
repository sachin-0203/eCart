from django.db.models import Q

from rest_framework.viewsets import ModelViewSet
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Product, ProductImage
from .serializers import ProductSerializer, ProductImageSerializer

from category.models import Category


class ProductViewSet(ModelViewSet):
  queryset = Product.objects.select_related(
    "brand",
    "category"
  ).prefetch_related("images")
  serializer_class = ProductSerializer
  lookup_field = "pk"
  lookup_value_regex = "[^/.]+"

  def get_object(self):
    queryset = self.filter_queryset(self.get_queryset())
    lookup = self.kwargs.get(
      self.lookup_url_kwarg or self.lookup_field
    )

    if lookup.isdecimal():
      product = get_object_or_404(queryset, pk=lookup)
    else:
      product = get_object_or_404(queryset, slug=lookup)

    self.check_object_permissions(self.request, product)
    return product

  def get_queryset(self):
    queryset = super().get_queryset()
    params = self.request.query_params

    category = params.get("category")
    department = params.get("department")
    brand = params.get("brand")

    if category:
      category_ids = self.get_category_ids(category)

      queryset = queryset.filter(category_id__in=category_ids)

    if department:
      queryset = queryset.filter(product_type__iexact=department)

    if brand:
      queryset = queryset.filter(brand__iexact=brand)

    search = params.get("search", "").strip()

    if search:
      for term in search.split():
        queryset = queryset.filter(
          Q(title__icontains=term)
          | Q(description__icontains=term)
          | Q(short_description__icontains=term)
          | Q(category__name__icontains=term)
          | Q(brand__name__icontains=term)
          | Q(product_type__icontains=term)
        )

    slug = params.get("slug")
    if slug:
      queryset = queryset.filter(slug=slug)

    return queryset.distinct()

  def get_category_ids(self, category_slug):
    try:
        category = Category.objects.get(slug=category_slug)
    except Category.DoesNotExist:
        return []

    category_ids = [category.id]
    parent_ids = [category.id]

    while parent_ids:
        child_ids = list(
            Category.objects.filter(
                parent_id__in=parent_ids
            ).values_list("id", flat=True)
        )

        category_ids.extend(child_ids)
        parent_ids = child_ids

    return category_ids

  @action(
    detail=False,
    methods=["get"],
    url_path="slug/(?P<slug>[^/.]+)"
  )
  def get_by_slug(self, request, slug=None):
    product = get_object_or_404(
      Product.objects.all(),
      slug=slug
    )
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
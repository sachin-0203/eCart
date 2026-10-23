from rest_framework.viewsets import ModelViewSet
from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(ModelViewSet):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer

  def get_queryset(self):
    queryset = super().get_queryset()
    slug = self.request.query_params.get("slug")
    return queryset.filter(slug=slug) if slug else queryset

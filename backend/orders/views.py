from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Order
from .serializers import OrderSerializer

class OrderViewSet(ReadOnlyModelViewSet):
  queryset = Order.objects.prefetch_related("items__product")
  serializer_class = OrderSerializer
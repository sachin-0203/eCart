from rest_framework import serializers

from .models import Order, OrderItems
from products.models import Product

class OrderProductSerializer(serializers.ModelSerializer):

  class Meta:
    model = Product
    fields = [
      "id",
      "title",
      "price",
    ]


class OrderItemSerializer(serializers.ModelSerializer):

  product = OrderProductSerializer(read_only=True)

  subtotal = serializers.ReadOnlyField()

  class Meta:
    model = OrderItems
    fields = [
      "id",
      "product",
      "quantity",
      "price",
      "subtotal",
    ]

class OrderSerializer(serializers.ModelSerializer):

  items = OrderItemSerializer(
    many=True,
    read_only=True
  )

  class Meta:
    model = Order
    fields = [
      "id",
      "items",
      "status",
      "created_at",
      "total_amount"
    ]
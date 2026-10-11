from rest_framework import serializers

from .models import Cart, CartItem
from products.models import Product



class CartProductSerializer(serializers.ModelSerializer):

  class Meta:
    model = Product
    fields = [
      "id",
      "title",
      "price",
    ]



class CartItemSerializer(serializers.ModelSerializer):

  product = CartProductSerializer(
    read_only = True
  )

  product_id = serializers.PrimaryKeyRelatedField(
    queryset=Product.objects.all(),
    source="product",
    write_only=True
  )

  sub_total = serializers.SerializerMethodField()

  class Meta:
    model = CartItem
    fields = [
      "id",
      "cart",
      "product",
      "product_id",
      "quantity",
      "sub_total",
    ]

  def get_sub_total(self, obj):
    return obj.product.price * obj.quantity

  def validate_quantity(self, value):
    if value <= 0:
      raise serializers.ValidationError("Quantity must be greater than 0.")
    return value

  def validate(self, data):
    product = data.get("product")

    if product is None and self.instance:
      product = self.instance.product

    quantity = data.get("quantity")

    if quantity is None and self.instance:
      quantity = self.instance.quantity

    if product is not None and quantity is not None:
      if quantity > product.stock:
        raise serializers.ValidationError({
          "quantity" : f"Only {product.stock} units are available"
        })
      
    return data



class CartSerializer(serializers.ModelSerializer):

  items = CartItemSerializer(
    many=True,
    read_only=True
  )

  total_price = serializers.SerializerMethodField()

  class Meta:
    model = Cart
    fields = [
      "id",
      "created_at",
      "items",
      "total_price",
    ]

  def get_total_price(self, obj):
    total = 0

    for item in obj.items.all():
      total += item.product.price * item.quantity

    return total

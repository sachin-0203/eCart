from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404

from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from products.models import Product




class CartViewSet(ModelViewSet):
  queryset = Cart.objects.prefetch_related("items__product")
  serializer_class = CartSerializer




class CartItemViewSet(ModelViewSet):
  queryset = CartItem.objects.select_related("product")
  serializer_class = CartItemSerializer


  def create(self, request, *args, **kwargs):

    cart_id = request.data.get("cart")
    product_id = request.data.get("product_id")
    quantity = request.data.get("quantity")

    product = get_object_or_404(
      Product,
      id=product_id
    )

    existing_item = CartItem.objects.filter(
      cart_id = cart_id,
      product_id = product_id
    ).first()

    if existing_item:
      new_quantity = existing_item.quantity + int(quantity)

      if new_quantity > product.stock:
        return Response(
          {
            "quantity" : f"Only {product.stock} units are available"
          },
          status=status.HTTP_400_BAD_REQUEST
        )

      existing_item.quantity = new_quantity
      existing_item.save()

      self.serializer = self.get_serializer(existing_item)

      return Response(
        self.serializer.data,
        status=status.HTTP_200_OK
      )

    return super().create(request, *args, **kwargs)



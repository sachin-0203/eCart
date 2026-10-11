from django.db import models

from products.models import Product

class Cart(models.Model):
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f"Cart {self.id}"

class CartItem(models.Model):

  cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")

  product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="cart_items")

  quantity = models.PositiveIntegerField(default=1)

  class Meta:
    constraints = [
      models.UniqueConstraint(
        fields = ["cart", "product"],
        name = "unique_product_per_cart"
      )
    ]

  def __str__(self):
    return f"{self.product.name} x {self.quantity}"
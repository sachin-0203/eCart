from django.db import models
from products.models import Product


class Order(models.Model):

  STATUS_CHOICES = [
    ("pending", "Pending"),
    ("confirmed","Confirmed"),
    ("shipped", "Shipped"),
    ("delivered", "Delivered"),
    ("cancelled", "Cancelled")
  ]

  status = models.CharField(
    max_length=20,
    choices=STATUS_CHOICES,
    default="pending"
  )

  total_amount = models.DecimalField(
    max_digits=10,
    decimal_places=2,
    default=0
  )

  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return f"Order {self.id}"


class OrderItems(models.Model):

  order = models.ForeignKey(
    Order,
    on_delete=models.CASCADE,
    related_name="items"
  )

  product = models.ForeignKey(
    Product,
    on_delete=models.PROTECT,
    related_name="order_items"
  )

  quantity = models.PositiveIntegerField()

  price = models.DecimalField(
    max_digits=10,
    decimal_places=2
  )

  def __str__(self):
    return f"Order {self.order_id} - {self.product_id}"

  @property
  def subtotal(self):
    return self.price * self.quantity
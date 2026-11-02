from django.db import models
from brand.models import Brand

# Create your models here.

from django.db import models
from category.models import Category
from brand.models import Brand


class Product(models.Model):
  PRODUCT_TYPE_CHOICES = [
    ("men", "Men"),
    ("women", "Women"),
    ("children", "Children"),
    ("unisex", "Unisex"),
  ]

  slug = models.SlugField(max_length=200, unique=True)

  title = models.CharField(max_length=200)

  brand = models.ForeignKey(
    Brand,
    on_delete=models.PROTECT,
    related_name="products"
  )

  category = models.ForeignKey(
    Category,
    on_delete=models.PROTECT,
    related_name="products"
  )

  product_type = models.CharField(
    max_length=20,
    choices=PRODUCT_TYPE_CHOICES,
    blank=True,
    default="",
  )

  sizes = models.JSONField(default=list, blank=True)

  price = models.DecimalField(max_digits=10, decimal_places=2)
  old_price = models.DecimalField(
    max_digits=10,
    decimal_places=2,
    null=True,
    blank=True
  )
  discount_percentage = models.DecimalField(
    max_digits=5,
    decimal_places=2,
    default=0
  )

  rating = models.DecimalField(
    max_digits=3,
    decimal_places=1,
    default=0
  )
  review_count = models.PositiveBigIntegerField(default=0)

  short_description = models.TextField()
  description = models.TextField()

  stock = models.PositiveIntegerField(default=0)
  in_stock = models.BooleanField(default=True)
  featured = models.BooleanField(default=False)
  bestseller = models.BooleanField(default=False)


  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
    return self.title


class ProductImage(models.Model):
  product = models.ForeignKey(
    Product,
    on_delete=models.CASCADE,
    related_name="images"
  )
  image = models.ImageField(upload_to="products/")

  def __str__(self):
    return f"{self.product.title} image"
from django.db import models

# Create your models here.

class Product(models.Model):
  # id = models.AutoField(primary_key=True)  # Django Create it automatically
  slug = models.CharField(max_length=200, unique=True)

  title = models.CharField(max_length=200)
  brand = models.CharField(max_length=50)
  category = models.CharField(max_length=100)
  sub_category = models.CharField(max_length=200)

  price = models.DecimalField(max_digits=10, decimal_places=2)
  old_price = models.DecimalField(max_digits=10, decimal_places=2)
  discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
 
  rating = models.DecimalField(max_digits=3, decimal_places=1)
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
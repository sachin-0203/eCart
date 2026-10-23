from django.db import migrations, models


class Migration(migrations.Migration):

  dependencies = [
    ("products", "0003_alter_product_slug"),
  ]

  operations = [
    migrations.AddField(
      model_name="product",
      name="product_type",
      field=models.CharField(
        blank=True,
        choices=[
          ("men", "Men"),
          ("women", "Women"),
          ("children", "Children"),
          ("unisex", "Unisex"),
        ],
        default="",
        max_length=20,
      ),
    ),
    migrations.AddField(
      model_name="product",
      name="sizes",
      field=models.JSONField(blank=True, default=list),
    ),
  ]

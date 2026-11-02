from django.db import migrations, models
import django.db.models.deletion

def migrate_product_categories(apps, schema_editor):
    Product = apps.get_model("products", "Product")
    Category = apps.get_model("category", "Category")

    db_alias = schema_editor.connection.alias

    for product in Product.objects.using(db_alias).all().iterator():

        category = Category.objects.using(db_alias).filter(
            name=product.sub_category,
            parent__name=product.category
        ).first()

        if category is None:
            category = Category.objects.using(db_alias).filter(
                name=product.category,
                parent__isnull=True
            ).first()

        if category is None:
            raise Exception(
                f"No matching category found for product: {product.title}"
            )

        # Populate the temporary ForeignKey, NOT the old category field.
        product.category_new_id = category.pk
        product.save(
            using=db_alias,
            update_fields=["category_new"]
        )

class Migration(migrations.Migration):

    dependencies = [
        ("category", "0001_initial"),
        ("products", "0005_alter_product_brand"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="category_new",
            field=models.ForeignKey(
                to="category.category",
                on_delete=django.db.models.deletion.PROTECT,
                related_name="+",
                null=True,
            ),
        ),

        migrations.RunPython(
            migrate_product_categories,
            migrations.RunPython.noop,
        ),

        migrations.RemoveField(
            model_name="product",
            name="sub_category",
        ),

        migrations.RemoveField(
            model_name="product",
            name="category",
        ),

        migrations.RenameField(
            model_name="product",
            old_name="category_new",
            new_name="category",
        ),

        migrations.AlterField(
            model_name="product",
            name="category",
            field=models.ForeignKey(
                to="category.category",
                on_delete=django.db.models.deletion.PROTECT,
                related_name="products",
            ),
        ),

        migrations.AlterField(
            model_name="product",
            name="old_price",
            field=models.DecimalField(
                max_digits=10,
                decimal_places=2,
                null=True,
                blank=True,
            ),
        ),

        migrations.AlterField(
            model_name="product",
            name="rating",
            field=models.DecimalField(
                max_digits=3,
                decimal_places=1,
                default=0,
            ),
        ),

        migrations.AlterField(
            model_name="product",
            name="slug",
            field=models.SlugField(
                max_length=200,
                unique=True,
            ),
        ),
    ]
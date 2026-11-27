from django.test import TestCase

from .models import Category
from .serializers import CategoryDetailSerializer


class CategoryDetailSerializerTests(TestCase):
  def test_includes_only_active_direct_subcategories(self):
    root = Category.objects.create(name="Men")
    active_subcategory = Category.objects.create(
      name="Shirts",
      parent=root,
    )
    Category.objects.create(
      name="Inactive",
      parent=root,
      is_active=False,
    )

    data = CategoryDetailSerializer(root).data

    self.assertEqual(
      [category["id"] for category in data["subcategories"]],
      [active_subcategory.id],
    )

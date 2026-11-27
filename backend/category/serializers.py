from rest_framework import serializers
from .models import Category


class CategorySerializer(serializers.ModelSerializer):
  parent_name = serializers.CharField(
    source="parent.name",
    read_only=True,
    allow_null=True
  )

  class Meta:
    model = Category
    fields = [
      "id",
      "name",
      "slug",
      "parent",
      "parent_name",
      "image",
      "is_active",
      "created_at",
      "updated_at",
    ]

    read_only_fields = [
      "id",
      "slug",
      "created_at",
      "updated_at",
    ]


class CategoryDetailSerializer(CategorySerializer):
  subcategories = serializers.SerializerMethodField()

  class Meta(CategorySerializer.Meta):
    fields = [*CategorySerializer.Meta.fields, "subcategories"]

  def get_subcategories(self, obj):
    active_subcategories = obj.subcategories.filter(is_active=True)
    return CategorySerializer(
      active_subcategories,
      many=True,
      context=self.context
    ).data
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
from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = Product
    fields = "__all__"

  def validate_sizes(self, value):
    if not isinstance(value, list):
      raise serializers.ValidationError("Sizes must be provided as a list.")

    sizes = []
    for size in value:
      if not isinstance(size, str) or not size.strip():
        raise serializers.ValidationError(
          "Each available size must be a non-empty string."
        )
      normalized_size = size.strip()
      if normalized_size not in sizes:
        sizes.append(normalized_size)

    return sizes
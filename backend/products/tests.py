from rest_framework.test import APITestCase


class ProductAudienceAndSizesTests(APITestCase):
  def test_product_list_can_filter_by_slug_and_returns_audience_and_sizes(self):
    response = self.client.post(
      "/api/products/",
      {
        "slug": "summer-dress",
        "title": "Summer Dress",
        "brand": "Example",
        "category": "Fashion",
        "sub_category": "Dresses",
        "product_type": "women",
        "sizes": ["S", "M", "L"],
        "price": "49.99",
        "old_price": "59.99",
        "discount_percentage": "16.67",
        "rating": "4.5",
        "review_count": 12,
        "short_description": "Lightweight summer dress.",
        "description": "A breathable dress for warm days.",
        "stock": 8,
        "in_stock": True,
        "featured": False,
        "bestseller": False,
      },
      format="json",
    )

    self.assertEqual(response.status_code, 201, response.data)

    response = self.client.get("/api/products/", {"slug": "summer-dress"})

    self.assertEqual(response.status_code, 200)
    self.assertEqual(len(response.data), 1)
    self.assertEqual(response.data[0]["product_type"], "women")
    self.assertEqual(response.data[0]["sizes"], ["S", "M", "L"])

  def test_sizes_must_be_a_list_of_non_empty_strings(self):
    response = self.client.post(
      "/api/products/",
      {
        "slug": "invalid-sizes",
        "title": "Product",
        "brand": "Example",
        "category": "Fashion",
        "sub_category": "Dresses",
        "sizes": "S, M, L",
        "price": "49.99",
        "old_price": "59.99",
        "rating": "4.5",
        "short_description": "Short description.",
        "description": "Full description.",
      },
      format="json",
    )

    self.assertEqual(response.status_code, 400)
    self.assertIn("sizes", response.data)

# from django.urls import path
# from .views import ProductList, ProductDetail


# urlpatterns = [
#   path('products/', ProductList.as_view(), name='product-list'),
#   path('product/<int:id>/', ProductDetail.as_view(), name='product-detail')
# ]

from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
  ProductViewSet,
  ProductImageUploadView,
  ProductImageViewSet,
)

router = DefaultRouter()

router.register("products", ProductViewSet)
router.register("product-image", ProductImageViewSet)

urlpatterns = [
  path(
    "product-images/upload/",
    ProductImageUploadView.as_view(),
    name="product-image-upload",
  ),
  path("", include(router.urls)),
]

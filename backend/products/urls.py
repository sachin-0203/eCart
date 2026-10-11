# from django.urls import path
# from .views import ProductList, ProductDetail


# urlpatterns = [
#   path('products/', ProductList.as_view(), name='product-list'),
#   path('product/<int:id>/', ProductDetail.as_view(), name='product-detail')
# ]

from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ProductViewSet

router = DefaultRouter()

router.register("products", ProductViewSet)

urlpatterns = [
  path("", include(router.urls)),
]

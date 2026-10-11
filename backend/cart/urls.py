from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import CartViewSet, CartItemViewSet

router = DefaultRouter()

router.register("cart", CartViewSet)
router.register("cart-item", CartItemViewSet)

urlpatterns = [
  path("", include(router.urls))
]
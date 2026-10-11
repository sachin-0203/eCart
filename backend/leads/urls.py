from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import LeadListView, LeadDetailView

# router = DefaultRouter()

# router.register("leads", LeadListView)

# urlpatterns = [
#   path("", include(router.urls))
# ]

urlpatterns = [
  path('leads/', LeadListView.as_view(), name="lead-list"),
  path('leads/<int:id>/', LeadDetailView.as_view(), name="lead-detail")
]
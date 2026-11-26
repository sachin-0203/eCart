from rest_framework.permissions import BasePermission

class IsAdminRole(BasePermission):
  """ Allow access to admin only """

  def has_permission(self, request, view):
    return (
      request.user
      and request.user.is_authenticated
      and request.user.role == "admin"
    )

class IsCustomerRole(BasePermission):
  """ Allow access to authenticated customers """

  def has_permission(self, request, view):
    return (
      request.user
      and request.user.is_authenticated
      and request.user.role == "customer"
    )
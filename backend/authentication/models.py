from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class User(AbstractUser):
  phone_number = models.CharField(
    max_length=15,
    blank=True,
    null=True
  )

  def __str__(self):
    return self.username


class EmailOTP(models.Model):
  email = models.EmailField(unique=True)
  code_hash = models.CharField(max_length=128)
  created_at = models.DateTimeField(default=timezone.now)
  expires_at = models.DateTimeField()
  attempts = models.PositiveSmallIntegerField(default=0)
  verified_at = models.DateTimeField(blank=True, null=True)
  verification_token_hash = models.CharField(max_length=128, blank=True)

  def __str__(self):
    return self.email
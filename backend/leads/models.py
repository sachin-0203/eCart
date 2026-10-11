from django.db import models

class Lead(models.Model):

  STATUS_CHOICES = [
    ('new', "NEW"),
    ('contacted', "Contacted"),
    ('resolved', "Resolved"),
  ]


  name = models.CharField(max_length=100)
  email = models.EmailField()
  phone = models.CharField(max_length=15, blank=True)
  subject = models.CharField(max_length=100)
  message = models.TextField()

  status = models.CharField(
    max_length=20,
    choices=STATUS_CHOICES,
    default="new"
  )

  created_at = models.DateTimeField(auto_now_add=True)

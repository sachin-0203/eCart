import re

from django.core import mail
from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from .models import User


@override_settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend')
class EmailOTPFlowTests(TestCase):

  def setUp(self):
    self.client = APIClient()

  def request_code(self, email):
    response = self.client.post(
      '/api/auth/otp/send/',
      {'email': email},
      format='json',
    )
    self.assertEqual(response.status_code, 200)
    self.assertEqual(len(mail.outbox), 1)
    code = re.search(r'\b\d{6}\b', mail.outbox[-1].body).group()
    return code

  def verify_code(self, email, code):
    response = self.client.post(
      '/api/auth/otp/verify/',
      {'email': email, 'code': code},
      format='json',
    )
    self.assertEqual(response.status_code, 200)
    self.assertTrue(response.data['verified'])
    return response.data

  def test_new_user_can_register_after_email_verification(self):
    email = 'new-customer@example.com'
    code = self.request_code(email)
    verification = self.verify_code(email, code)

    self.assertTrue(verification['is_new_user'])
    response = self.client.post(
      '/api/auth/register/',
      {
        'username': 'new-customer',
        'email': email,
        'password': 'A-strong-password-123!',
        'password2': 'A-strong-password-123!',
        'verification_token': verification['verification_token'],
      },
      format='json',
    )

    self.assertEqual(response.status_code, 201)
    self.assertEqual(response.data['user']['email'], email)
    self.assertTrue(response.data['access'])
    self.assertTrue(response.data['refresh'])
    self.assertEqual(User.objects.filter(email=email).count(), 1)

  def test_existing_user_can_sign_in_and_refresh_session_after_verification(self):
    email = 'customer@example.com'
    User.objects.create_user(
      username='customer',
      email=email,
      password='A-strong-password-123!',
    )

    code = self.request_code(email)
    verification = self.verify_code(email, code)
    self.assertFalse(verification['is_new_user'])

    response = self.client.post(
      '/api/auth/login/',
      {
        'email': email,
        'verification_token': verification['verification_token'],
      },
      format='json',
    )
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data['user']['username'], 'customer')

    refresh_response = self.client.post(
      '/api/auth/token/refresh/',
      {'refresh': response.data['refresh']},
      format='json',
    )
    self.assertEqual(refresh_response.status_code, 200)
    self.assertTrue(refresh_response.data['access'])

    profile_response = self.client.get(
      '/api/auth/profile/',
      HTTP_AUTHORIZATION=f"Bearer {refresh_response.data['access']}",
    )
    self.assertEqual(profile_response.status_code, 200)
    self.assertEqual(profile_response.data['email'], email)

  def test_registration_requires_verified_email_token(self):
    response = self.client.post(
      '/api/auth/register/',
      {
        'username': 'unverified',
        'email': 'unverified@example.com',
        'password': 'A-strong-password-123!',
        'password2': 'A-strong-password-123!',
      },
      format='json',
    )

    self.assertEqual(response.status_code, 400)
    self.assertEqual(User.objects.count(), 0)

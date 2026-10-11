from django.shortcuts import  get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Lead
from .serializers import LeadSerializer




class LeadListView(APIView):

  def get(self,request):
    leads = Lead.objects.all()
    serializer = LeadSerializer(leads, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

  def post(self, request):
    serializer = LeadSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class LeadDetailView(APIView):

  def get(self, request, id):
    lead = get_object_or_404(Lead, id=id)
    serializer = LeadSerializer(lead)
    return Response(serializer.data, status=status.HTTP_200_OK)

  def put(self, request, id):
    lead = get_object_or_404(Lead, id=id)
    serializer = LeadSerializer(lead, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def patch(self, request, id):
    lead = get_object_or_404(Lead, id=id)
    serializer = LeadSerializer(lead, data=request.data, partial=True)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, id):
    lead = get_object_or_404(Lead, id=id)
    lead.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    
    
from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.models import Book
from base.serializers import BookSerializer

# Create your views here.

@api_view(['GET'])
def getBooks(request):
  books = Book.objects.all()
  serializer = BookSerializer(books, many=True)
  return Response(serializer.data)

@api_view(['GET'])
def getBook(request,pk):
  book= Book.objects.get(_id=pk)
  serializer = BookSerializer(book, many=False)
  return Response(serializer.data)
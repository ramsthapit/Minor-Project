from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .books import books
from .models import Book
from .serializers import BookSerializer, UserSerializer, UserSerializerWithToken

# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
      data = super().validate(attrs)

      serializers = UserSerializerWithToken(self.user).data
      for k, v in serializers.items():
        data[k]=v

      return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
  routes=[
    '/api/books/',
    '/api/books/create/',
    '/api/books/upload/',
    '/api/books/<id>/reviews/',
    '/api/books/top/',
    '/api/books/<id>/',
    '/api/books/delete/<id>/',
    '/api/books/<update>/<id>/',
  ]
  return Response(routes)

@api_view(['GET'])
def getUserProfile(request):
  user = request.user
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)

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
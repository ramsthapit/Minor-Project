from email import message
from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from .books import books
from .models import Book
from django.contrib.auth.models import User
from .serializers import BookSerializer, UserSerializer, UserSerializerWithToken

# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
      data = super().validate(attrs)

      serializers = UserSerializerWithToken(self.user).data
      for k, v in serializers.items():
        data[k]=v

      return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
  data = request.data

  try:
    user = User.objects.create(
      first_name = data['name'],
      username = data['email'],
      email = data['email'],
      password = make_password(data['password']),
    )
  
    serializers = UserSerializerWithToken(user, many=False)
    return Response(serializers.data)

  except:
    message = {'details':'User with this email already exits'}
    return Response(message, status = status.HTTP_400_BAD_REQUEST)

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
@permission_classes([IsAuthenticated])
def getUserProfile(request):
  user = request.user
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
  users = User.objects.all()
  serializer = UserSerializer(users, many=True)
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
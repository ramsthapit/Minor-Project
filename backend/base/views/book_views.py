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
  book = Book.objects.get(_id=pk)
  serializer = BookSerializer(book, many=False)
  return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteBook(request, pk):
  book = Book.objects.get(_id=pk)
  book.delete() 
  return Response('Book deleted')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createBook(request):
  user = request.user
  book = Book.objects.create(
    user=user,
    author='sample name',
    country='country',
    description='',
    language='english',
    link='',
    # page=0,
    title='title name',
    # year='',
    category=0,
  )
  serializer = BookSerializer(book, many=False)
  return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateBook(request, pk):
  data = request.data
  book = Book.objects.get(_id=pk)
  book.author = data['author'],
  book.country = data['country'],
  book.description = data['description'],
  book.language = data['language'],
  book.link = data['link'],
  # book.page = data['page'],
  book.title = data['title'],
  # book.year = data['year'],
  
  book.save()
 
  serilizer = BookSerializer(book, many=False)
  return Response(serilizer.data)

from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .books import books

# Create your views here.

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
def getBooks(request):
  return Response(books)

@api_view(['GET'])
def getBook(request,pk):
  book = None
  for i in books:
    if i['_id'] == pk:
      book = i

  return Response(book)
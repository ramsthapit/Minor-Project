from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Book, Review
from base.serializers import BookSerializer

# Create your views here.

@api_view(['GET'])
def getBooks(request):
  query = request.query_params.get('keyword')

  if query == None:
    query = ''

  books = Book.objects.filter(title__icontains=query)

  page = request.query_params.get('page')
  paginator = Paginator(books,4)

  try:
    books = paginator.page(page)
  except PageNotAnInteger:
    books = paginator.page(1)
  except EmptyPage:
    books = paginator.page(paginator.num_pages)

  if page == None:
    page = 1

  page = int(page)

  serializer = BookSerializer(books, many=True)
  return Response({'books':serializer.data, 'page': page, 'pages': paginator.num_pages})

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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBookReview(request, pk):
  user = request.user
  book = Book.objects.get(_id=pk)
  data = request.data

  # 1 - review already exists
  alreadyExists = book.review_set.filter(user=user).exists()
  if alreadyExists:
    content = {'detail':'Book already reviewed'}
    return Response(content, status=status.HTTP_400_BAD_REQUEST)

  # 2 - no rating or 0
  elif data['rating']==0:
    content = {'detail':'Please select a rating'}
    return Response(content, status=status.HTTP_400_BAD_REQUEST)

  # 3 - create review
  else:
    review = Review.objects.create(
      user = user,
      book = book,
      name = user.first_name,
      rating = data['rating'],
      comment = data['comment'], 
    )

    reviews = book.review_set.all()
    book.numReviews = len(reviews)

    total = 0
    for i in reviews:
      total += i.rating

    book.rating = total / len(reviews)
    book.save()

    return Response('Review Added')
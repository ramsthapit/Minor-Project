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
  paginator = Paginator(books,12)

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
    category=0,
    author = 'sample name',
    title = 'title',
    series = 'series',
    rating = 'rating',
    description = 'description',
    language = 'english',
    isbn = 'isbn',
    genres = 'genres',
    characters = 'characters',
    bookForm = 'bookForm',
    pages = 'pages',
    publisher = 'publisher',
    publishDate = 'publishDate',
    numRatings = 'numRatings',
    coverImg = 'coverImg',
    price = 'price',
  )
  serializer = BookSerializer(book, many=False)
  return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateBook(request, pk):
  data = request.data
  book = Book.objects.get(_id=pk)
  book.author = data['author'],
  book.title = data['title'],
  book.series = data['series'],
  book.author = data['author'],
  book.rating = data['rating'],
  book.description = data['description'],
  book.language = data['language'],
  book.isbn = data['isbn'],
  book.genres = data['genres'],
  book.characters = data['characters'],
  book.bookForm = data['bookForm'],
  book.pages = data['pages'],
  book.publisher = data['publisher'],
  book.publishDate = data['publishDate'],
  book.numRatings = data['numRatings'],
  book.coverImg = data['coverImg'],
  book.price = data['price'],
  
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


import pickle

similarity = pickle.load(open('similarity.pkl', 'rb'))

@api_view(['GET'])
def recommend(request, pk):
    book = Book.objects.get(_id=pk)
    distances = similarity[book._id-1]
    book_list = sorted(
        list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
    bookList=Book.objects.none()
    for i in book_list:
        books = Book.objects.filter(_id=(i[0]+1))
        print(books)
        bookList |=books

    serializer = BookSerializer(bookList, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getTopBooks(request):
    books = Book.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)

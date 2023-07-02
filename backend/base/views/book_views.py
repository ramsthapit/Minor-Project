import pickle
from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Book, Review, Dashboard
from base.serializers import BookSerializer, DashboardSerializer

# Create your views here.


@api_view(['GET'])
def getBooks(request):
    query = request.query_params.get('keyword')

    if query == None:
        query = ''

    books = Book.objects.filter(title__icontains=query)

    # bookForm filter 
    bookForm = request.query_params.get('bookForm')
    if bookForm == None:
        bookForm = ''

    bookForm = bookForm.split(',')

    for i in bookForm:
        books = books.filter(bookForm__icontains=i)


    # language filter 
    language = request.query_params.get('language')
    if language == None:
        language = ''

    books = books.filter(language__icontains=language)

    # genres filter 
    genres = request.query_params.get('genres')
    if genres == None:
        genres = ''
    genres = genres.split(',')

    for i in genres:
        books = books.filter(genres__icontains=i)

    # bookPages filter 
    bookPages = request.query_params.get('bookPages')
    if bookPages != None:
        bookPages = bookPages.split('-')
        books = books.filter(pages__gte=bookPages[0],pages__lte=bookPages[1])

    # price filter 
    price = request.query_params.get('price')
    if price != None:
        price = price.split('-')
        books = books.filter(price__gte=price[0],price__lte=price[1])

    # rating filter 
    rating = request.query_params.get('rating')
    if rating != None:
        rating = rating.split('-')
        books = books.filter(rating__gte=rating[0],rating__lte=rating[1])
    
    # publishDate filter 
    publishDate = request.query_params.get('publishDate')
    if publishDate != None:
        publishDate = publishDate.split(',')
        books = books.filter(publishDate__range=[publishDate[0], publishDate[1]])

    bookNo=12
    page = request.query_params.get('page')
    if query == "":
        bookNo=15
    
    paginator = Paginator(books, bookNo)

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
    return Response({'books': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getBook(request, pk):
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
    data = request.data
    book = Book.objects.create(
        user=user,
        title = data['title'],
        series = data['series'],
        author = data['author'],
        rating = data['rating'],
        description = data['description'],
        language = data['language'],
        isbn = data['isbn'],
        genres = data['genres'],
        characters = data['characters'],
        bookForm = data['bookForm'],
        pages = data['pages'],
        publisher = data['publisher'],
        publishDate = data['publishDate'],
        numRatings = data['numRatings'],
        coverImg = data['coverImg'],
        price = data['price'],
    )
    serializer = BookSerializer(book, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateBook(request, pk):
    data = request.data
    # print(request.user.is_staff)
    # print(data)
    book = Book.objects.get(_id=pk)
    book.title = data['title']
    book.series = data['series']
    book.author = data['author']
    book.rating = data['rating']
    book.description = data['description']
    book.language = data['language']
    book.isbn = data['isbn']
    book.genres = data['genres']
    book.characters = data['characters']
    book.bookForm = data['bookForm']
    book.pages = data['pages']
    book.publisher = data['publisher']
    book.publishDate = data['publishDate']
    book.numRatings = data['numRatings']
    book.coverImg = data['coverImg']
    book.price = data['price']

    book.save()

    serilizer = BookSerializer(book, many=False)
    return Response(serilizer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateBookId(request, pk, pk1):
    data = request.data
    # print(request.user.is_staff)
    # print(data)
    # print(pk1)
    book = Book.objects.get(_id=pk)
    book.title = data['title']
    book.series = data['series']
    book.author = data['author']
    book.rating = data['rating']
    book.description = data['description']
    book.language = data['language']
    book.isbn = data['isbn']
    book.genres = data['genres']
    book.characters = data['characters']
    book.bookForm = data['bookForm']
    book.pages = data['pages']
    book.publisher = data['publisher']
    book.publishDate = data['publishDate']
    book.numRatings = data['numRatings']
    book.coverImg = data['coverImg']
    book.price = data['price']

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
        content = {'detail': 'Book already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - no rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - create review
    else:
        review = Review.objects.create(
            user=user,
            book=book,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = book.review_set.all()
        book.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        book.rating = total / len(reviews)
        book.save()

        return Response('Review Added')


similarity = pickle.load(open('similarity.pkl', 'rb'))


@api_view(['GET'])
def recommend(request, pk):
    book = Book.objects.get(_id=pk)
    distances = similarity[book._id-1]
    book_list = sorted(
        list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
    bookList = Book.objects.none()
    for i in book_list:
        books = Book.objects.filter(_id=(i[0]+1))
        print(books)
        bookList |= books

    serializer = BookSerializer(bookList, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getTopBooks(request):
    books = Book.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getDashboard(request):
    books = Book.objects
    totalBooks = books.all().count()
    totalUsers = User.objects.all().count()
    rating={"ratingFive" : books.filter(rating__gte=4,rating__lte=5).count(),
    "ratingFour" : books.filter(rating__gte=3,rating__lte=4).count(),
    "ratingThree" : books.filter(rating__gte=2,rating__lte=3).count(),
    "ratingTwo" : books.filter(rating__gte=1,rating__lte=2).count(),
    "ratingOne" : books.filter(rating__gte=0,rating__lte=1).count(),}
    
    fiction = books.filter(genres__icontains="fiction").count()
    young = books.filter(genres__icontains="young").count()
    fantasy = books.filter(genres__icontains="fantasy").count()
    magic = books.filter(genres__icontains="magic").count()
    novels = books.filter(genres__icontains="novels").count()
    paperback = books.filter(bookForm__icontains="paperback").count()
    hardcover = books.filter(bookForm__icontains="hardcover").count()
    kindle = books.filter(bookForm__icontains="kindle").count()
    mass = books.filter(bookForm__icontains="mass").count()
    dashboardData={
        "totalBooks":totalBooks,
        "totalUsers":totalUsers,
        "rating": rating,
        "genres":{"fiction":fiction,"young":young,"fantasy":fantasy,"magic":magic,"novels":novels,},
        "paperback":paperback,
        "hardcover":hardcover,
        "kindle":kindle,
        "mass":mass,
    }
    # dashboard = Dashboard.objects.create(
    #     totalBooks=totalBooks,totalUsers=totalUsers
    # )
    # serializer = DashboardSerializer(dashboard, many=True)
    # return Response(serializer.data)
    return Response(dashboardData)

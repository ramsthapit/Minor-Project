from django.urls import path
from base.views import book_views as views

urlpatterns = [
    path("", views.getBooks, name="books"),
    path("dashboard/", views.getDashboard, name="dashboard"),
    path("resetCategory/", views.resetCategory, name="resetCategory"),
    path("resetBook/", views.resetBook, name="resetBook"),
    path("category/", views.getCategory, name="category"),
    path("top/", views.getTopBooks, name="topratedBooks"),
    path("<str:pk>/recommend/", views.recommend, name="recommend"),
    path("<str:pk>/reviews/", views.createBookReview, name="create-review"),
    path("delete/<str:pk>/", views.deleteBook, name="delete-book"),
    path("create/", views.createBook, name="create-book"),
    path("<str:pk>/", views.getBook, name="book"),
    path("update/<str:pk>/", views.updateBook, name="update-book"),
    path("update/<str:pk>/<str:pk1>/", views.updateBookId, name="update-book-id"),
]

from django.urls import path
from base.views import book_views as views

urlpatterns = [
    path('', views.getBooks,name="books"),
    path('<str:pk>/', views.getBook,name="book"),
    path('delete/<str:pk>/', views.deleteBook,name="delete-book"),
    path('create/', views.createBook,name="create-book"),
    path('update/<str:pk>/', views.updateBook,name="update-book"),
] 
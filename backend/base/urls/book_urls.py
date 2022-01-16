from django.urls import path
from base.views import book_views as views

urlpatterns = [
    path('', views.getBooks,name="books"),
    path('<str:pk>/', views.getBook,name="book"),
] 
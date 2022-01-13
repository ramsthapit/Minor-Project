from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes,name="routes"),
    path('books/', views.getBooks,name="books"),
    path('book/<str:pk>/', views.getBook,name="book"),
]

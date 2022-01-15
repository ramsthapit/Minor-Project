from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

urlpatterns = [
    path('users/login/', TokenObtainPairView.as_view(),
        name='token_obtain_pair'),
    path('', views.getRoutes,name="routes"),
    path('books/', views.getBooks,name="books"),
    path('book/<str:pk>/', views.getBook,name="book"),
] 

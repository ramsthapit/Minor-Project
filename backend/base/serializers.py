from dataclasses import fields
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Book, Review, Dashboard

class UserSerializer(serializers.ModelSerializer):
  name = serializers.SerializerMethodField(read_only=True)
  _id = serializers.SerializerMethodField(read_only=True)
  isAdmin = serializers.SerializerMethodField(read_only=True)
  isVendor = serializers.SerializerMethodField(read_only=True)

  class Meta:
    model= User
    fields=['id','_id','username','email', 'name','isAdmin','isVendor']
  
  def get__id(self, obj):
    return obj.id

  def get_isAdmin(self, obj):
    return obj.is_superuser
  
  def get_isVendor(self, obj):
    return obj.is_staff

  def get_name(self, obj):
    name = obj.first_name
    if name == '':
      name= obj.email
    return name

class UserSerializerWithToken(UserSerializer):
  token = serializers.SerializerMethodField(read_only=True)
  class Meta:
    model = User
    fields=['id','_id','username','email', 'name','isAdmin','isVendor','token']

  def get_token(self, obj):
    token = RefreshToken.for_user(obj)
    return str(token.access_token)

class ReviewSerializer(serializers.ModelSerializer):
  class Meta:
    model= Review
    fields='__all__'

class BookSerializer(serializers.ModelSerializer):
  reviews = serializers.SerializerMethodField(read_only=True)
  _id = serializers.SerializerMethodField(read_only=True)

  class Meta:
    model= Book
    fields='__all__'

  def get_reviews(self, obj):
    reviews = obj.review_set.all()
    serializers = ReviewSerializer(reviews, many=True)
    return serializers.data
  
  def get__id(self, obj):
    return obj._id
  
class DashboardSerializer(serializers.ModelSerializer):
  class Meta:
    model= Dashboard
    fields='__all__'
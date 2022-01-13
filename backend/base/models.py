from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Category(models.Model):
  _id=models.AutoField(primary_key=True, editable=False)
  name=models.CharField(max_length=200, null=True, blank=True)

  def __str__(self):
    return self.name

class Book(models.Model):
  user=models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
  author=models.CharField(max_length=200, null=True, blank=True) 
  country=models.CharField(max_length=200, null=True, blank=True)
  image= models.ImageField(null=True, blank=True)
  category=models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
  description = models.TextField(null=True, blank=True)
  rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
  numReviews = models.IntegerField(null=True, blank=True, default=0)
  language=models.CharField(max_length=200, null=True, blank=True)
  link=models.URLField(unique=True,null=True, blank=True)
  page=models.PositiveIntegerField()
  title=models.CharField(max_length=200, null=True, blank=True)
  year=models.DateField(blank=True)
  createdAt= models.DateTimeField(auto_now_add=True)
  _id=models.AutoField(primary_key=True, editable=False)


  def __str__(self):
    return self.title

class Review(models.Model):
  book=models.ForeignKey(Book, on_delete=models.SET_NULL, null=True)
  user=models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
  rating=models.IntegerField(null=True, blank=True, default=0)
  comment=models.TextField(null=True, blank=True)
  _id=models.AutoField(primary_key=True, editable=False)

  def __str__(self):
    return str(self.rating)


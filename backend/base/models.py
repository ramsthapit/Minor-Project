from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Category(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    _id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=200)
    series = models.CharField(max_length=255, null=True, blank=True)
    author = models.CharField(max_length=200, null=True, blank=True)
    rating = models.FloatField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    language = models.CharField(max_length=200, null=True, blank=True)
    isbn = models.CharField(max_length=255, null=True, blank=True)
    genres = models.TextField(null=True, blank=True)
    characters = models.TextField(null=True, blank=True)
    bookForm = models.CharField(max_length=255, null=True, blank=True)
    pages = models.IntegerField(null=True, blank=True)
    publisher = models.CharField(max_length=255, null=True, blank=True)
    publishDate = models.DateField(null=True, blank=True)
    numRatings = models.BigIntegerField(null=True, blank=True)
    coverImg = models.URLField(max_length=200, null=True, blank=True)
    price = models.DecimalField(
        max_digits=1000, decimal_places=2, null=True, blank=True
    )

    def __str__(self):
        return str("%s (%s)" % (self._id, self.title))

    # def save(self, *args, **kwargs):
    #     obj = super(Book, self).save(*args, **kwargs)
    #     if obj.id:
    #         # for later use
    #         pass
    #     return obj


class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


# class Dashboard(models.Model):
#     totalBooks = models.IntegerField(null=True, blank=True, default=0)
#     totalUsers = models.IntegerField(null=True, blank=True, default=0)

#     createdAt = models.DateTimeField(auto_now_add=True)
#     # _id = models.AutoField(primary_key=True, editable=False)

#     def __str__(self):
#         return str(self.rating)

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db.models.fields.json import DataContains
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from .manager import CustomUserManager
from rest_framework_simplejwt.tokens import RefreshToken


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=120, unique=True)
    first_name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=120)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name']
    objects = CustomUserManager()

    def get_full_name(self):
        return self.first_name + ' ' +self.last_name

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access':str(refresh.access_token)
        }


class Movie(models.Model):
    title = models.CharField(max_length=300)
    rated = models.CharField(max_length=50)
    released = models.DateField(null=True)
    runtime = models.CharField(max_length=50)
    genre = models.CharField(max_length=200)
    director = models.CharField(max_length=100)
    writer = models.TextField()
    actors = models.TextField()
    plot = models.TextField()
    language = models.CharField(max_length=100)
    country = models.CharField(max_length=50)
    awards = models.TextField()
    poster = models.URLField()
    metascore = models.IntegerField()
    imdbrating = models.DecimalField(max_digits=2, decimal_places=1)
    imdbvotes = models.IntegerField()
    imdbid = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    dvd = models.DateField(null=True)
    boxoffice = models.IntegerField()
    production = models.CharField(max_length=100)
    website = models.URLField()

    def __str__(self):
        return self.title + ' '+ str(self.pk)


    @classmethod
    def get_all(cls):
        return cls.objects.all()
    
class MovieComments(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.comment 

    @classmethod
    def get_all(cls):
        return cls.objects.all()
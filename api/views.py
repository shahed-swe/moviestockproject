from django.contrib.auth import authenticate
from django.http.response import HttpResponsePermanentRedirect, JsonResponse
from rest_framework import generics, status, permissions
from .serializers import *
from rest_framework.response import Response
from .renderers import UserRenderer
from django.conf import settings
from .models import User
import os
from datetime import datetime
from django_filters.rest_framework import DjangoFilterBackend
import requests
from rest_framework.permissions import IsAuthenticated

class CustomRedirect(HttpResponsePermanentRedirect):
    allowed_schemes = [os.environ.get('APP_SCHEMA'), 'http', 'https']


class UserProfile(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    renderer_classes = (UserRenderer,)

    def get(self, request):

        first_name  = request.user.first_name
        last_name = request.user.last_name
        email = request.user.email
        authenticate = request.user.is_authenticated

        return Response({
            'user': {
                'first_name': first_name,
                'last_name': last_name,
                'email': email,
            },
            'isAuthenticated':authenticate,
            'status': status.HTTP_200_OK
        })

class UserRegisterView(generics.GenericAPIView):
    serializer_class = UserSerializer
    renderer_classes = (UserRenderer,)

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        return Response({
            'email': user_data['email'],
            'message':'Successfully Registered.',
            'status': status.HTTP_201_CREATED
        })


class LoginApiView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        serializer.is_valid(raise_exception=True)
        mainUser = User.objects.get(email=serializer.data['email'])

        data = {
            'email': serializer.data['email'],
            'refresh': mainUser.tokens()['refresh'],
            'access': mainUser.tokens()['access'],
        }

        return Response(data, status=status.HTTP_200_OK)


class LogoutApiView(generics.GenericAPIView):
    serializer_class = LogoutSerializer

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'message':'Logout Successful'} ,status=status.HTTP_200_OK)



class MovieAPIView(generics.GenericAPIView):
    serializer_class = MovieSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend]

    def post(self, request, format=None):
        title = request.data.get('title')

        if not title:
            response = {
                'message': 'No Title exists , Please provide title first',
            }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
        payload = {
            'apikey': settings.OMDB_API_KEY,
            't': title,
        }

        url = 'http://www.omdbapi.com'

        movierequest = requests.get(url, params=payload)
        movierequest = movierequest.json()

        if movierequest.get('Response') == False:
            response = {
                'error': 'Movie with name: {} doesn\'t exist'.format(title),
            }
            return response(response, status.HTTP_400_BAD_REQUEST)

        if movierequest.get('imdbID') in [str(q) for q in Movie.get_all()]:
            response = {
                'message': 'Movie with name {} already exists'.format(title),
            }

        movie = Movie()
        for key, value in movierequest.items():

            if key == 'Year' or key == 'Ratings' or key == 'Response':
                continue

            elif key == 'Released' or key == 'DVD':
                value = datetime.strptime(value, '%d %b %Y').date() if value != 'N/A' else None

            elif key == 'imdbVotes' or key == 'BoxOffice' or key == 'Metascore':
                if ',' in value:
                    value = value.replace(',', '')
                if '$' in value:
                    value = value.replace('$', '')
                value = int(value) if value != 'N/A' else 0
            elif key == 'imdbRating':
                value = float(value) if value != 'N/A' else 0

            key = key.lower()

            setattr(movie, key, value)
        movie.save()

        serializer = MovieSerializer(movie)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, format=None):
        order_by = request.GET.get('order_by')
        desc = request.GET.get('desc')

        order_by = 'imdbrating' if order_by == 'rating' else order_by

        if not order_by:
            serializer = MovieSerializer(Movie.get_all(), many=True)
            return Response(serializer.data)
        else:
            if order_by != 'imdbrating' and order_by != 'title':
                order_by = 'id'

            if desc == 'true':
                order_by = '-' + order_by

            qs = Movie.get_all().order_by(order_by)
            serializer = MovieSerializer(qs, many=True)
            return Response(serializer.data)


class CommentsAPIView(generics.GenericAPIView):

    serializer_class = MovieSerializer
    permission_class = (permissions.IsAuthenticated,)


    def post(self, request, format=None):

        movie_id = request.data.get('movie_id')
        comment = request.data.get('comment')

        if not movie_id or not comment:
            response = {
                'error': 'Please provide movie ID and comment'
            }
            return Response(response, status.HTTP_400_BAD_REQUEST)

        movies = Movie.get_all()
        movie_list = [str(i.pk) for i in movies]
        if movie_id not in movie_list:
            response = {
                'error': f'Movie with movie id {movie_id}, doesn\'t exist in DB. Make sure to enter imdb id'
            }
            return Response(response, status.HTTP_400_BAD_REQUEST)

        movie = Movie.objects.get(pk=movie_id)
        new_comment = MovieComments(comment=comment, movie=movie)
        new_comment.save()

        serializer = MovieCommentsSerializer(new_comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, id, format=None):
        if id:
            qs = MovieComments.objects.filter(movie=id)
            serializer = MovieCommentsSerializer(qs, many=True)
            return Response(serializer.data)

        serializer = MovieCommentsSerializer(MovieComments.get_all(), many=True)
        return Response(serializer.data)

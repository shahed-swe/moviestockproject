from django.urls import path
from . import views
from django.conf.urls import url

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)


urlpatterns = [
    path('registration/', views.UserRegisterView.as_view(), name='registration'),
    path('login/', views.LoginApiView.as_view(), name='login'),
    path('profile/', views.UserProfile.as_view(), name='profile'),
    path('logout/', views.LogoutApiView.as_view(), name='logout'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('movies/', views.MovieAPIView.as_view(), name='movies'),
    path('moviecomments/', views.CommentsAPIView.as_view(), name='moviecomments'),
    url(r'^moviecomments/(?P<id>.*)/$', views.CommentsAPIView.as_view(), name='moviecomments'),
]

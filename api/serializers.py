from decimal import MAX_EMAX
from rest_framework import serializers
from .models import *
from django.core.validators import *
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, required=True, min_length=8, max_length=16)
    confirm_password = serializers.CharField(write_only=True, required=True, min_length=8, max_length=16)

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password', 'confirm_password', 'is_active')


    def validate(self, attrs):
        email = attrs.get('email','')
        first_name = attrs.get('first_name', '')
        last_name = attrs.get('last_name', '')
        password = attrs.get('password', '')
        confirm_password = attrs.get('confirm_password', '')

        if validate_email(email) == True:
            raise serializers.ValidationError({
                "email": "given email format is not valid"
            })

        if not len(first_name) > 3:
            raise serializers.ValidationError({
                'first_name': 'First name length must be at least 3 characters'
            })
        if not len(last_name) > 3:
            raise serializers.ValidationError({
                'last_name': 'Last name length must be at least 3 characters'
            })
        if password != confirm_password:
            raise serializers.ValidationError({
                {
                    "password": "password and confirm password does not match"
                }
            })
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
            is_active=True,
        )
        return user



class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(max_length=255, min_length=8, write_only=True)
    token = serializers.CharField(read_only=True)

    def get_token(self, obj):
        user = User.objects.get(email=obj['email'])

        return {
            'refresh_token': user.tokens()['refresh'],
            'access_token': user.tokens()['access'],
        }

    class Meta:
        model = User
        fields = ('email', 'password', 'token')

    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')
        filtered_user_by_email = User.objects.filter(email=email)
        user = auth.authenticate(email=email, password=password)

        if not user:
            raise AuthenticationFailed({
                'message': 'Invalid Credentials, Please try again',
            })
        if not user.is_active:
            raise AuthenticationFailed({
                'message': 'Account disabled, Contact with admin',
            })
        
        return {
            'email':user.email,
            'token': user.tokens,
        }
        return super().validate(attrs)


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_messages = {
        'bad_token':'Token is expired or invalid',
    }

    def validate(self, attrs):
        self.token = attrs.get('refresh')

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError as e:
            self.fail('bad_token', e)


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'


class MovieCommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieComments
        fields = '__all__'
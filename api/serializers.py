from rest_framework import serializers
# from django.contrib.auth.models import User
from first_project.models import *

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'photo',
            'date_of_birth',
            'user'
        ]

class CommentSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    autor_name = serializers.ReadOnlyField(source='user.username')
    created_at = serializers.DateTimeField(format="%Y.%m.%d %H:%M")
    class Meta:
        model = Comment
        fields = [
            'id',
            'text',
            'autor_name',
            'created_at',
            'photo_url'
        ]
    def get_photo_url(self, com):
        photo_url = str(com.user.profile.photo)
        if photo_url:
            user_avatar = '/static/mediafiles/' + photo_url
        else:
            user_avatar = '/static/first_project/no_avatar.svg'
        return user_avatar


 


class UserPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'url',
            'profile'
        ]


class UserDetailSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only = True)
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'is_staff',
            'profile'
        ]

class ArticlePreviewSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    autor_name = serializers.ReadOnlyField(source='autor.username')
    created_at = serializers.DateTimeField(format="%Y.%m.%d %H:%M")
    class Meta:
        model = Article
        fields = [
            'id',
            'title',
            'created_at',
            'announce_text',
            'url',
            'autor_name',
            'likes',
            'dislikes',
            'photo_url'
        ]
    def get_photo_url(self, art):
        photo_url = str(art.autor.profile.photo)
        if photo_url:
            user_avatar = '/static/mediafiles/' + photo_url
        else:
            user_avatar = '/static/first_project/no_avatar.svg'
        return user_avatar
        


class ArticleDetailSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    autor_name = serializers.ReadOnlyField(source='autor.username')
    created_at = serializers.DateTimeField(format="%Y.%m.%d %H:%M")
    comment = CommentSerializer(required=False, many=True)
    class Meta:
        model = Article
        fields = [
            'id',
            'title',
            'created_at',
            'text',
            'autor_name',
            'likes',
            'dislikes',
            'photo_url',
            'comment',
        ]
    def get_photo_url(self, art):
        photo_url = str(art.autor.profile.photo)
        if photo_url:
            user_avatar = '/static/mediafiles/' + photo_url
        else:
            user_avatar = '/static/first_project/no_avatar.svg'
        return user_avatar
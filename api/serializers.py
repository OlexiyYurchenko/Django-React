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
        photo_url = com.user.profile.image
        if photo_url:
            user_avatar = 'https://res.cloudinary.com/devblog12/image/upload/' + str(photo_url) + '.jpg'
        else:
            user_avatar = '/static/first_project/no_avatar.svg'
        return user_avatar


 



class ArticlePreviewSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    autor_name = serializers.ReadOnlyField(source='autor.username')
    pk_user = serializers.ReadOnlyField(source='autor.pk')
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
            'photo_url',
            'pk_user'
        ]
    def get_photo_url(self, art):
        photo_url = art.autor.profile.image
        if photo_url:
            user_avatar = 'https://res.cloudinary.com/devblog12/image/upload/' + str(photo_url) + '.jpg'
        else:
            user_avatar = '/static/first_project/no_avatar.svg'
        return user_avatar
        


class ArticleDetailSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    autor_name = serializers.ReadOnlyField(source='autor.username')
    pk_user = serializers.ReadOnlyField(source='autor.pk')
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
            'pk_user',
            'comment',
        ]
    def get_photo_url(self, art):
        photo_url = art.autor.profile.image
        if photo_url:
            user_avatar = 'https://res.cloudinary.com/devblog12/image/upload/' + str(photo_url) + '.jpg'
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
    photo_url = serializers.SerializerMethodField()
    user = ArticlePreviewSerializer(required=False, many=True)
    comment = CommentSerializer(required=False, many=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'is_staff',
            'profile',
            'photo_url',
            'user',
            'comment'
        ]

    def get_photo_url(self, art):
        photo_url = art.profile.image
        if photo_url:
            user_avatar = 'https://res.cloudinary.com/devblog12/image/upload/' + str(photo_url) + '.jpg'
        else:
            user_avatar = '/static/first_project/no_avatar.svg'
        return user_avatar
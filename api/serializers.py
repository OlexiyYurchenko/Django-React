from rest_framework import serializers
# from django.contrib.auth.models import User
from first_project.models import *

class CommentSerializer(serializers.ModelSerializer):
    autor_name = serializers.ReadOnlyField(source='user.username')
    created_at = serializers.DateTimeField(format="%Y.%m.%d %H:%M")
    class Meta:
        model = Comment
        fields = [
            'id',
            'text',
            'autor_name',
            'created_at'
        ]

class ArticlePreviewSerializer(serializers.ModelSerializer):

    autor_name = serializers.ReadOnlyField(source='autor.username')
    created_at = serializers.DateTimeField(format="%Y.%m.%d %H:%M")
    likes = serializers.ReadOnlyField(source='0')
    class Meta:
        model = Article
        fields = [
            'id',
            'title',
            'created_at',
            'announce_text',
            'url',
            'autor_name',
            'likes'
        ]
       


class ArticleDetailSerializer(serializers.ModelSerializer):
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
            'comment'
        ]
 


class UserPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'email',
            'url',
        ]


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'is_staff',
        ]
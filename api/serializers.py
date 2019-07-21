from rest_framework import serializers
# from django.contrib.auth.models import User
from first_project.models import *


class ArticlePreviewSerializer(serializers.ModelSerializer):

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
            'autor_name'
        ]
       


class ArticleDetailSerializer(serializers.ModelSerializer):
   class Meta:
       model = Article
       fields = [
           'title',
           'created_at',
           'text',
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
from django.shortcuts import render, redirect
from first_project.models import Menus, Product
from django.contrib.auth.models import User
from django.contrib.messages import warning
from django.shortcuts import HttpResponse
from django.views.generic import View
from rest_framework import viewsets
from .serializers import *



class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ArticlePreviewSerializer
        return ArticleDetailSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return UserPreviewSerializer
        return UserDetailSerializer

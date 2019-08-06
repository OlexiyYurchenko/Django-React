"""source URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from first_project import views, article_views
from first_project.article_views import *
from first_project.views import *


from django.contrib.auth.models import User



urlpatterns = [
    # path('', views.home, name='home'),
    path('join/', views.Register.as_view(), name='join'),
    path('login/', views.Login.as_view(), name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('goods/', article_views.sub, name='sub'),
    path('add/', views.Articles.as_view(), name='add'),
    path('comment/', views.Comments.as_view(), name='comment'),
    path('userrr/', views.curent_user, name='user'),
    path('artlike/<int:pk>/<int:val>', views.artikle_like, name='like'),
    path('', IndexView.as_view()),
    # path('goods/<int:pk>/', article_views.sub, name='sub'),
]
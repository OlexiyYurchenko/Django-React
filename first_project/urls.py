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
from django.urls import path, include, re_path
from first_project import views
from first_project.views import *



urlpatterns = [
    path('request/comment/', views.Comments.as_view(), name='comment'),
    path('request/artlike/<int:pk>/<int:val>', views.artikle_like, name='like'),
    path('request/add/', views.Articles.as_view(), name='add'),
    path('request/edituser/', views.EditUser.as_view()),
    path('request/login/', views.Login.as_view(), name='login'),
    path('request/logout/', views.logout_view, name='logout'),
    path('request/join/', views.Register.as_view(), name='join'),
    path('request/user/', views.curent_user, name='user'),
    re_path('', IndexView.as_view()), 
]
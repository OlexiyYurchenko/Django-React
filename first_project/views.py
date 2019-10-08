from django.shortcuts import render, redirect
from first_project.models import *
from django.contrib.auth.models import User
from first_project.forms import ArticleForm, CommentForm, ProfileForm
from django.contrib.auth import authenticate, login as native_login, logout
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.messages import debug, info, warning, error
from django.views.generic import View 
from django.core.mail import send_mail
from django.shortcuts import HttpResponse
from django.http import JsonResponse
from django.views.generic import TemplateView
from django.views.decorators.csrf import ensure_csrf_cookie

import cloudinary
import cloudinary.uploader
import cloudinary.api

# Create your views here.

cloudinary.config( 
  cloud_name = "devblog12", 
  api_key = "711264524717733", 
  api_secret = "_RhErvar9-a1AB3nq7DpGd2bKic" 
)


def home(request):
    data = {}
    menu = Menus.objects.all()
    
    return render(request, 'first_project/home.html', data)

class Register(View):
    
    def post(self, request):
        data = {}        
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        data['username'] = username
        data['email'] = email
        data['password'] = password
        try:
            if len(User.objects.all()) ==0:
                user = User.objects.create_superuser(username, email, password)
            else:
                user = User.objects.create_user(username, email, password)
            user.save()

            
            native_login(request, user)
            # send_mail('Register', 'You have successfully registered', 'lexa3938@gmail.com', [email])
            Profile(user=request.user).save()
            user_avatar = '/static/first_project/no_avatar.svg'
            data = {
                'user': username,
                'user_avatar': user_avatar,
            }
            return JsonResponse(data)
        except IntegrityError:
            data = {
                'result': 'error',
                'message': 'Username is not unique',
            }
            return JsonResponse(data)
        except ValueError:
            data = {
                'result': 'error',
                'message': 'Error value',
            }
            return JsonResponse(data)
    def get(self, request):
        data = {}
        return render(request, 'first_project/register.html', data)

def logout_view(request):
    logout(request)
    data = {
        'result': 'success',
    }
    return JsonResponse(data)

class Articles(View):
    def post(self, request):
        form = ArticleForm(request.POST)
        if form.is_valid():
            post = Article(**form.cleaned_data)
            post.announce_text = str(request.POST.get('text'))[:512]
            post.autor = request.user
            post.save()
            data = {
                'result': 'succes',
            }
            return JsonResponse(data)
        else:
            data = {
                'result': 'false'
            }
            return JsonResponse(data)

def logout_view(request):
    logout(request)
    data = {
        'result': 'success',
    }
    return JsonResponse(data)


def curent_user(request):
    if request.user.is_anonymous:
        data = {'result': str(request.user)}
    else:
        user = Profile.objects.get(user=request.user)
        if user.image:
            user_avatar = 'https://res.cloudinary.com/devblog12/image/upload/' + str(user.image) + '.jpg'
        else:
            user_avatar = '/static/first_project/no_avatar.svg'
        data = {
            'user': str(request.user),
            'user_avatar': user_avatar,
            'id': request.user.id
        }

    return JsonResponse(data)

class Login(View):
    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is None:
            data = {
                'result': 'error',
                'message': 'Form invalid',
            }
            return JsonResponse(data)

        else:
            native_login(request, user)
            user = Profile.objects.get(user=user)
            if user.image:
                user_avatar = 'https://res.cloudinary.com/devblog12/image/upload/' + str(user.image) + '.jpg'
            else:
                user_avatar = '/static/first_project/no_avatar.svg'
            data = {
                'result': username,
                'user_avatar': user_avatar,
            }
            return JsonResponse(data)


class IndexView(TemplateView):
   template_name = 'first_project/api.html'

class Comments(View):
    def post(self, request):
        form = CommentForm(request.POST)
        if form.is_valid():
            pk = request.POST.get('id')
            article = Article.objects.get(pk=pk)
            comments = Comment(**form.cleaned_data)
            print(comments.text)
            comments.user = request.user
            comments.article = article
            comments.save()
            data = {
                'result': 'succes',
            }
            return JsonResponse(data)
        else:
            data = {
                'result': 'false'
            }
            return JsonResponse(data)

def artikle_like(request, pk, val):
    article = Article.objects.get(pk=pk)
    try:
        like = Like.objects.get(user=request.user.id, article=pk)

        if like.val==1 and val==1:
            like.val = 0
            article.likes -= 1
        elif like.val==1 and val==2:
            like.val = 2
            article.likes -= 1
            article.dislikes += 1
        elif like.val==2 and val==2:
            like.val = 0
            article.dislikes -= 1
        elif like.val==2 and val==1:
            like.val = 1
            article.dislikes -= 1
            article.likes += 1
        elif like.val==0 and val==1:
            like.val = 1
            article.likes += 1
        elif like.val==0 and val==2:
            like.val = 2
            article.dislikes += 1
        article.save()
        like.save()
        data = {
            'result': val,
        }
        return JsonResponse(data)
    except Like.DoesNotExist:
        if val==1:
            article.likes += 1
            Like(user=request.user, article=article, val=1).save()
        else:
            article.dislikes += 1
            Like(user=request.user, article=article, val=2).save()
        article.save()
        data = {
            'result': val,
        }
        return JsonResponse(data)

class EditUser(View):
    def post(self, request):
        
        profile = Profile.objects.get(user=request.user)
        avatar = request.FILES.get('file', False)
        username = request.POST.get('name', False)
        if username:
            try:
                profile.user.username = username
                profile.user.save()
            except:
                data = {
                    'user': 'error',
                }
                return JsonResponse(data)
        if avatar:
            profile.image = avatar
            profile.save()


        data = {
            'user': username,
            'user_avatar': str(avatar),
        }
        return JsonResponse(data)

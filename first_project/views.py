from django.shortcuts import render, redirect
from first_project.models import Menus, Product, Article
from first_project.forms import ArticleForm
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


# Create your views here.


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
            send_mail('Register', 'You have successfully registered', 'lexa3938@gmail.com', [email])
            native_login(request, user)
            data = {
                'result': 'success',
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


def curent_user(request):
    print(request.user)
    data = {
        'result': request.user,
    }
    return HttpResponse(data)

class Articles(View):
    def post(self, request):
        form = ArticleForm(request.POST)
        if form.is_valid():
            post = Article(**form.cleaned_data)
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
    data = {
        'result': str(request.user),
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
            data = {
                'result': username,
            }
            return JsonResponse(data)

    def get(self, request):
        return render(request, 'first_project/login.html', {})


class IndexView(TemplateView):
   template_name = 'first_project/api.html'
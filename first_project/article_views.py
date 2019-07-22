from django.shortcuts import render, redirect
from first_project.models import Menus, Product
from django.contrib.auth.models import User
from django.contrib.messages import warning
from django.shortcuts import HttpResponse
from django.views.generic import View
from rest_framework import viewsets


def sub(request):
    data = {}
    producsts = Product.objects.all()
    data['producsts'] = producsts
    return render(request, 'first_project/submenu.html', data)
    
def product(request):
    data = {}

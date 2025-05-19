from django.http import HttpResponse #used to response to the browser
from django.shortcuts import render

def homepage(request):
    return render(request,"index.html")

def about(request):
    return render(request,"about.html")

def product(request):
    return render(request,"product.html")

def contact(request):
    return render(request,"contact.html")
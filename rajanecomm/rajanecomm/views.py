from django.http import HttpResponse #used to response to the browser
from django.shortcuts import render

def homepage(request):
    data ={
        'title':'Electromart home page'
    }
    return render(request,"index.html",data)

def aboutus(request):
    return HttpResponse("welcome to rajanecomm")

def products(request):
    return HttpResponse("<b>Here are the products</b>")

def productdetails(request,productid):
    return HttpResponse(productid)
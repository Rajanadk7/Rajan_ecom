from django.http import HttpResponse #used to response to the browser

def aboutus(request):
    return HttpResponse("welcome to rajanecomm")

def products(request):
    return HttpResponse("<b>Here are the products</b>")

def productdetails(request,productid):
    return HttpResponse(productid)
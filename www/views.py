from django.shortcuts import render
import requests

import calendar
import json

from django.http import HttpResponse, HttpResponseNotFound

from django.template import TemplateDoesNotExist
from django.utils.datetime_safe import datetime
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from account.functions import get_client_ip
from account.models.account import Account
# Create your views here.

def create_account(request):
    if request.method == "POST":
        if Account.objects.filter(email=request.POST['email']).exists():
            return HttpResponse("dupe")
        else:
           ip = get_client_ip(request)
           dob = datetime.strptime(request.POST['birth_day'] + request.POST['birth_month'] + request.POST['birth_year'], "%d%m%Y").date()
           cid = ""
           if "cid" in request.GET:
                cid = request.GET["cid"]
        account = Account.objects.create(email=request.POST['email'], first_name=request.POST['first_name'],)
        return HttpResponse("window.location.href='/lp/?id=check-email&cid=" + cid + "'")

def free_angel_consultation(request):
    if "uid" not in request.GET and "cid" not in request.GET:
        return HttpResponseNotFound("<script async src='https://www.googletagmanager.com/gtag/js?id=UA-82494651-10'></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-82494651-10');</script>Elysia-medium.com SUSPENDED")
    return render(request, "free-angel-consultation.html", locals())

def landing_pages(request):
    #return render(request,'cc.html')
    if "uid" in request.GET and "cid" not in request.GET:
        return HttpResponseNotFound("<script async src='https://www.googletagmanager.com/gtag/js?id=UA-82494651-10'></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-82494651-10');</script>Elysia-medium.com SUSPENDED")
    if "id" is request.GET:
        return redirect("/")
    else:
        template = "landing_pages/ss.html"
        cid = ""
        if "cid" in request.GET:
            cid = request.GET["cid"]
    try:
        return render(request, template, locals())
    except TemplateDoesNotExist:
            return redirect("/")



def shop(request):
#    if "uid" not in request.GET and "cid" not in request.GET:
#        return HttpResponseNotFound("<script async src='https://www.googletagmanager.com/gtag/js?id=UA-82494651-10'></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-82494651-10');</script>Elysia-medium.com SUSPENDED")
    return render(request,'shop.html')

def aapp1(request):
    return render(request, 'aapp1.html')

def aapp2(request):
    return render(request, 'aapp2.html')

def aapp3(request):
    return render(request, 'aapp3.html')

def check_email_ss(request):
    return render(request, 'check-email-ss.html')

def ss(request):
    return render(request, 'ss.html')

def cc(request):
    return render(request, 'cc.html')

def one(request):
    return render(request, '1.html')

def checkout_test(request):
    return render(request, 'checkout_test.html')


#    if "uid" not in request.GET and "cid" not in request.GET:
#        return HttpResponseNotFound("<script async src='https://www.googletagmanager.com/gtag/js?id=UA-82494651-10'></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'UA-82494651-10');</script>Elysia-medium.com SUSPENDED")
#    else:
#        if "cid" is "test":
#            template = "landing_pages/check-email-ss.html",
#            account = test
#    return render(request, template, locals())

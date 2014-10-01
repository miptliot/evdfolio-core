# -*- coding: utf-8 -*-
from django.http import HttpResponse 
from django.contrib.auth import authenticate, login, logout

from django.shortcuts import render_to_response, redirect
from person.models import Person
from django.template import RequestContext
from django.core.context_processors import csrf

from django.contrib.auth.decorators import login_required

def main(request):


    context = {}
    variables = RequestContext(request,context)
    variables.update(csrf(request))
    return render_to_response('main.html',variables)



def user_login(request):
    username = request.POST['email']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            # Redirect to a success page.
            return redirect('/dashboard',  permanent=True)
        else:
            # Return a 'disabled account' error message
            return redirect('/',  permanent=True)
    else:
        # Return an 'invalid login' error message.
        return redirect('/',  permanent=True)
 

def user_logout(request):

    logout(request)
    return redirect('/',  permanent=True)


def registration(request):
    if request.method == 'POST':
    
        email = request.POST['email']
        name = request.POST['name']
        surname = request.POST['surname']
        password = request.POST['password']
        user_type = request.POST['user_type']
    
        #try:
        user = Person.objects.create_user(username = email, first_name = name, email = email, password = password, last_name = surname, user_type = user_type)
            
        user = authenticate(username=email, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                # Redirect to a success page.
                return redirect('/dashboard',  permanent=True)
            else:
                # Return a 'disabled account' error message
                return redirect('/',  permanent=True)
        else:
            # Return an 'invalid login' error message.
            return redirect('/',  permanent=True)
            
            
        
        #except:
            #return redirect('/',  permanent=True)
            
        
    context = {}
    variables = RequestContext(request,context)
    variables.update(csrf(request))
    return render_to_response('registration.html',variables)

@login_required
def dashboard(request):


    context = {
        'nav_url':'overview',
        #'formform':FormForm(),
        }
    variables = RequestContext(request,context)
    variables.update(csrf(request))
    return render_to_response('dashboard/overview.html',variables)


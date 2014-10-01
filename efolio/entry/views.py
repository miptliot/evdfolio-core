# -*- coding: utf-8 -*-
from django.http import HttpResponse 
from django.contrib.auth import authenticate, login, logout

from django.shortcuts import render_to_response, redirect
from person.models import Person
from django.template import RequestContext
from django.core.context_processors import csrf
from django.core.exceptions import ObjectDoesNotExist, ValidationError

from django.contrib.auth.decorators import login_required

from entry.models import Entry

import json
import simplejson
from tools.jsonans import jsonSimpleAns
from validator.validator import validation
import datetime


@login_required
def all_entry(request):
    
    all_entry = Entry.objects.all()    
    
    #for a in all_entry:
        #try:
            #a.entry_json['timestamp']
        #except:
            #current_datetime = datetime.datetime.now().isoformat()
            #a.entry_json.update({
                #"timestamp": current_datetime,
                #"stored": current_datetime,
            #})
            #a.save()
    
    
    context = {
        'nav_url':'all_entry',
        'all_entry':all_entry,
    }
    variables = RequestContext(request,context)
    variables.update(csrf(request))
    return render_to_response('dashboard/all_entry.html',variables)




@login_required
def entry(request, id = None):
    
   
    try:
        entry = Entry.objects.get(identity = id)
    except:
        entry = Entry.objects.filter(identity = id)[0]
    #pretty_entry_json = json.dumps(entry.entry_json, sort_keys=True, indent=4, separators=(',', ': '))
    #entry.entry_json = pretty_entry_json
    
    #dump_entry_json = entry.entry_json
    #dump_entry_json = simplejson.dumps( entry.entry_json )
    #entry.entry_json = dump_entry_json
    
    
    context = {
        'nav_url':'entry',
        'entry':entry,
        #'dump_entry_json':dump_entry_json,
    }
    variables = RequestContext(request,context)
    variables.update(csrf(request))
    return render_to_response('dashboard/entry.html',variables)


@login_required
def post_entry(request):
    
    if request.method == 'POST':
        entry_json = request.POST['entry_json']

        #vaildation
        valid = validation(entry_json)
        if valid != 'True':
            return HttpResponse(valid)

        data = json.loads(entry_json)
        entry_id = data["id"]
        
        current_datetime = datetime.datetime.now().isoformat()
        
        data.update({
            "timestamp": current_datetime,
            "stored": current_datetime,
        })
        
        try:
            entry = Entry.objects.get(identity = entry_id)
            
            context = {
                'nav_url':'post_entry',
            }
            variables = RequestContext(request,context)
            variables.update(csrf(request))
            return render_to_response('dashboard/post_entry.html',variables)
        
        except Entry.DoesNotExist:
            
            
            
            new_entry = Entry.objects.create()
            new_entry.identity = entry_id
            new_entry.entry_json = data
            new_entry.save()

            return redirect('/entry/all_entry',  permanent=True)
    
    
    context = {
        'nav_url':'post_entry',
    }
    variables = RequestContext(request,context)
    variables.update(csrf(request))
    return render_to_response('dashboard/post_entry.html',variables)




#@login_required
#def get_entry(request):
    
    
    
    #context = {
    #}
    #variables = RequestContext(request,context)
    #variables.update(csrf(request))
    #return render_to_response('main.html',variables)

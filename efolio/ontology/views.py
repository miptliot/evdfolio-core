 # -*- coding: utf-8 -*-
from django.http import HttpResponse 
from django.contrib.auth import authenticate, login, logout

from django.shortcuts import render_to_response, redirect
from person.models import Person
from django.template import RequestContext
from django.core.context_processors import csrf
from django.core.exceptions import ObjectDoesNotExist, ValidationError

from django.contrib.auth.decorators import login_required


import json
import simplejson
from tools.jsonans import jsonSimpleAns

from ontology.models import Ontology

@login_required
def new_ontology(request):
    if request.method == 'POST':
        ontology_json = request.POST['ontology_json']
        ontology_name = request.POST['ontology_name']

        #TODO
        #check valid json
        #check correct name

        try:
            ontology = Ontology.objects.get(name = ontology_name)
            
            context = {
                'nav_url':'new_ontology',
            }
            variables = RequestContext(request,context)
            variables.update(csrf(request))
            return render_to_response('dashboard/new_ontology.html',variables)
        
        except Ontology.DoesNotExist:
            
            new_ontology = Ontology.objects.create(
                name = ontology_name,
                ontology_json = ontology_json
            )
            
            return redirect('/ontology/all_ontology',  permanent=True)
    
    context = {
        'nav_url':'new_ontology',
    }
    variables = RequestContext(request,context)
    variables.update(csrf(request))
    return render_to_response('dashboard/new_ontology.html',variables)




@login_required
def all_ontology(request):
    
    all_ontology = Ontology.objects.all()    
    
    context = {
        'nav_url':'all_ontology',
        'all_ontology':all_ontology,
    }
    variables = RequestContext(request,context)
    variables.update(csrf(request))
    return render_to_response('dashboard/all_ontology.html',variables)




@login_required
def ontology(request, id = None):
    
   
    try:
        ontology = Ontology.objects.get(id = id)
    except:
        pass
    
    
    if request.method == 'POST':
        ontology_json = request.POST['ontology_json']

        #TODO
        #check valid json
        #check correct name

        try:
            ontology.ontology_json = ontology_json
            
            ontology.save()
        
        except :
            
           pass
            
            
    context = {
        'nav_url':'ontology',
        'ontology':ontology,
        #'dump_entry_json':dump_entry_json,
    }
    variables = RequestContext(request,context)
    variables.update(csrf(request))
    return render_to_response('dashboard/ontology.html',variables)



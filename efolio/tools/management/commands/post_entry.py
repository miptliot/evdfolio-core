# -*- coding: utf-8 -*-

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError
from django.db.utils import DatabaseError
import random
import math
import time
import os
from subprocess import call
from django import db
from datetime import date , datetime

from django.conf import settings
from settings import MEDIA_ROOT, MEDIA_URL, BASE_DIR


db_path = os.path.join(BASE_DIR, 'db.sqlite3')


#from distutils.cmd import Command
from subprocess import check_call, PIPE, CalledProcessError


from entry.models import Entry


import sys, fileinput
import json
import simplejson

from validator.validator import validation


class Command(BaseCommand):
    args = 'no'
    help = '''
        Return all entry identity list
    '''
    def handle(self, *args, **options):
        
        # example input json_string
        # WARNING id must be unique !
        #'{"object": {"definition": {"name": {"en-US": "simple statement"}, "description": {"en-US": "A simple Experience ctivity/object."}}, "id": "http://example.adlnet.gov/xapi/example/simplestatement"}, "verb": {"id": "http://adlnet.gov/expapi/verbs/created", "display": {"en-US": "created"}}, "id": "f57ac10b-58cc-4372-a567-0e02b2c3d479", "actor": {"mbox": "mailto:userexample.com", "name": "3", "objectType": "Agentx"}, "provider": "0"}'
        

        
        if len(args) > 0:
            
            #return simplejson.dumps(args[0:])
            
            
            #json_string = ''.join(args[0:])
            #entry_json = json.loads(json_string)
            
            #entry_json = json.loads(args[0])
            entry_json = args[0]

            #vaildation
            valid = validation(entry_json)
            if valid != 'True':
                return valid

            data = json.loads(entry_json)
            entry_id = data["id"]
            
            try:
                data['timestamp']
            except:
                current_datetime = datetime.datetime.now().isoformat()
                data.update({
                    "timestamp": current_datetime,
                    "stored": current_datetime,
                })
            
            
            try:
                entry = Entry.objects.get(identity = entry_id)
                return 'exist'
            
            except Entry.DoesNotExist:
                
                new_entry = Entry.objects.create()
                new_entry.identity = entry_id
                new_entry.entry_json = data
                new_entry.save()

                return 'saved'
            
            
            











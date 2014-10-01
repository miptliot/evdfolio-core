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

import simplejson

from tools.jsonify import jsonify


class Command(BaseCommand):
    args = 'no'
    help = '''
        Return all entry identity list
    '''
    def handle(self, *args, **options):
        if len(args) > 0:
            identity = args[0]
            
            try:
                entry = Entry.objects.get(identity = identity)
                
                side_json = []
                
                fields = ['identity','person','verb','tags','ontology']
                
                side_with_shedule = jsonify( entry,fields,to_dict=True )
                    
                side_with_shedule.update( {'entry_json' : entry.entry_json} )
                    
                side_json.append(side_with_shedule)        
                
                side_json = simplejson.dumps(side_json)
        
                return side_json
                
                
            except Entry.DoesNotExist:
                return ''

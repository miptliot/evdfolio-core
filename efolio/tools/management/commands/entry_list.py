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




class Command(BaseCommand):
    args = 'no'
    help = '''
        Return all entry identity list
    '''
    def handle(self, *args, **options):
        
        all_entry = Entry.objects.all()
        
        entry_list = []
          
        for e in all_entry:
            entry_list.append(str(e.identity))


        e_list = simplejson.dumps(entry_list)
        return e_list
        
        
        list_str = ','.join(entry_list)
            
        return list_str
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
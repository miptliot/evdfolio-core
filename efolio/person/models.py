# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User 
import datetime


from jsonfield.fields import JSONField


USER_TYPES = [
    ('0',u'admin'),
    ('1',u'teacher'),
    ('2',u'student'),
]

    

class Person(User):

    user_type = models.CharField(
        max_length = 30,
        verbose_name=u"Type",
        blank=False,
        choices=USER_TYPES,
        default=2,
    )
    patronymic =  models.CharField(
        max_length = 150,
        verbose_name = u"patronymic",
        blank = True,
    )
    
    info_json = JSONField( null = True, blank = True)
    
    def full_name(self):
        return self.first_name + ' ' + self.last_name + ' ' + self.patronymic
    
    def __unicode__(self):
        return str(self.id)
    
    
#alias   
#class Identifier(models.Model):
    #person = models.ForeignKey(
        #'Person',
        #blank = False,
        #null = False,
    #)
    #identifier = models.CharField(
        #max_length = 150,
    #)
    
    #def __unicode__(self):
        #return str(self.id)
    
    
    
    
    
    
    
        

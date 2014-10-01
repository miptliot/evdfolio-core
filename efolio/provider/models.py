 # -*- coding: utf-8 -*-
from django.db import models
import datetime



TYPES_DICT = {
    u'0':{
        'ru': u'',
        'en':''
        },
    u'1':{
        'ru': u'',
        'en':''
        }
}

TYPES_RUS = [
    ('0',u''),
    ('1',u''),
    ('2',u''),
]


    

class Entry(models.Model):
    title = models.CharField(
        max_length=150,
    )
    description = models.CharField(
        max_length = 5000,
        verbose_name=u"description",
        blank=True,
    )
    value = models.PositiveIntegerField(
        verbose_name=u"",
        default = 1,
    )
    
    

    
    def __unicode__(self):
        return str(self.id) + ' '+ self.title

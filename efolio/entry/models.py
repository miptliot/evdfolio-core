 # -*- coding: utf-8 -*-
from django.db import models
import datetime

from person.models import Person
from jsonfield.fields import JSONField


VERBS = [
    ('0',u'a'),
    ('1',u'b'),
    ('2',u'v'),
]


#identity
#person
#verb
#tags
#ontology
#entry_json


class Entry(models.Model):
    identity = models.CharField(
        max_length=30,
        blank = False,
    )
    person = models.ForeignKey(
        Person,
        blank = True,
        null = True,
    )
    verb = models.CharField(
        max_length = 30,
        verbose_name=u"Type",
        blank=True,
        choices=VERBS,
        default=2,
    )
    tags = models.CharField(
        max_length = 1000,
        verbose_name=u"tags",
        blank=True,
    )
    ontology = models.CharField(
        max_length = 1000,
        verbose_name=u"ontology",
        blank=True,
    )
    #entry_json = models.CharField(
        #max_length = 5000,
        #verbose_name=u"entry_json",
        #blank=False,
    #)
    entry_json = JSONField( null=False, blank=False)

    
    def __unicode__(self):
        return str(self.identity)









































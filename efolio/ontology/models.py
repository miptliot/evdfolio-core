 # -*- coding: utf-8 -*-
from django.db import models
import datetime

from jsonfield.fields import JSONField


    

class Ontology(models.Model):
    
    name = models.CharField(
        max_length = 200,
        verbose_name=u"ontology_name",
        blank=True,
    )
    ontology_json = JSONField( null=False, blank=False)

    
    def __unicode__(self):
        return str(self.id) + ' ' + self.name









































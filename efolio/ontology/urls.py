from django.conf.urls import patterns, include, url
from ontology.views import (
   ontology, all_ontology, new_ontology
)

urlpatterns = patterns('',
    url(r'^$', new_ontology),
    url(r'^new_ontology$', new_ontology),
    url(r'^all_ontology$', all_ontology),
    url(r'^ontology_(?P<id>\d+)$', ontology),
    #url(r'^entry_(?P<id>[0-9a-f\-]+)$', entry),
    #url(r'^entry_(?P<id>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{8})$', entry),
    
    
    
    
    #shifrate by id
    #url(r'^(?P<id>\d+)$', achievement),
    
    #deshifrate from shorthand_url code
    #url(r'^(?P<id>\d+)$', shorthand_url),
    
)
from django.conf.urls import patterns, include, url
from entry.views import (
   post_entry, all_entry, entry,
)

urlpatterns = patterns('',
    url(r'^$', all_entry),
    url(r'^all_entry$', all_entry),
    #url(r'^entry$', entry),
    url(r'^post_entry$', post_entry),
    url(r'^entry_(?P<id>\d+)$', entry),
    url(r'^entry_(?P<id>[0-9a-f\-]+)$', entry),
    #url(r'^entry_(?P<id>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{8})$', entry),
    
    
    
    
    #shifrate by id
    #url(r'^(?P<id>\d+)$', achievement),
    
    #deshifrate from shorthand_url code
    #url(r'^(?P<id>\d+)$', shorthand_url),
    
)
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static


from django.contrib import admin
admin.autodiscover()

from django.views.generic import TemplateView


from django.conf import settings

from views import (main, user_login, user_logout, registration, dashboard

)

urlpatterns = patterns('',
    # Examples:
    #url(r'^$', 'efolio.views.home', name='home'),
    #url(r'^$', TemplateView.as_view(template_name="main.html")),
    url(r'^$', main),
    url(r'^login$', user_login),
    url(r'^logout$', user_logout),
    url(r'^dashboard$', dashboard),
    url(r'^registration$', registration),
    
    url(r'^entry/', include('entry.urls')),
    url(r'^ontology/', include('ontology.urls')),
    
    # url(r'^blog/', include('blog.urls')),
    #url(r'^login$', 'django.contrib.auth.views.login'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    #url(r'^$', TemplateView.as_view(template_name="main.html")), 
)





if  settings.DEBUG:
    urlpatterns += patterns('',
        (r'^(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
        
    )
    urlpatterns +=  patterns(static(settings.STATIC_URL, document_root=settings.STATIC_ROOT))
    pass
else:
    pass
    
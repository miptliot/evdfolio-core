from django.contrib import admin
from entry.models import (
    Entry,
)
    
class EntryAdmin(admin.ModelAdmin):
    pass



admin.site.register( Entry, EntryAdmin)
# -*- coding: utf-8 -*-
from django import template
import re




register = template.Library()


@register.simple_tag
def active(nav_url, pattern):
    if nav_url == pattern:
        return 'active'
    return ''



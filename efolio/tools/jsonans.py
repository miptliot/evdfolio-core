from django.http import HttpResponse
import simplejson


def jsonSimpleAns(error = None, info = None):
  ans = {}
  ans['ok'] = True
  ans['error'] = ""
  if error:
    ans['ok'] = False
    ans['error'] = error
  if info:
    if info and type(info) == type(ans):
      ans.update(info)
    else:
      ans['info'] = info
  json = simplejson.dumps(ans)
  return HttpResponse(json, mimetype='application/json' )#mimetype='text/javascript'
 
def jsonSimpleAns_text(error = None, info = None):
  ans = {}
  ans['ok'] = True
  ans['error'] = ""
  if error:
    ans['ok'] = False
    ans['error'] = error
  if info:
    if info and type(info) == type(ans):
      ans.update(info)
    else:
      ans['info'] = info
  json = simplejson.dumps(ans)
  return str(json)
 
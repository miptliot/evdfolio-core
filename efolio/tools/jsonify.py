def jsonify(object, fields=None, to_dict=False):
	'''Simple convert model to json'''
	try:
		import json
	except:
		import django.utils.simplejson as json

	out = {}
	if type(object) not in [dict,list,tuple] :

		#for i in object:
			out = {}
			if fields:
				for field in fields:
                                    try:
					raw_attr = object.__getattribute__(field)
					if hasattr(raw_attr, '__call__'):
						clean_attr = raw_attr()
					else:
						clean_attr = raw_attr
					out[field] = unicode(clean_attr)
                                    except KeyError:
                                        out[field] = ''
			else:
				for attr, value in object.__dict__.iteritems():
					#if attr == 'timestamp':
						#return attr
						#tmp[attr] = ''#'%s' % value.ctime()
					#else:
						out[attr] = value
						#return attr
			#out.append(tmp)
	else:
		out = object
	if to_dict:
		return out
	else:
		return json.dumps(out)
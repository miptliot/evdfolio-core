#test_validation.py



from jsonschema import Draft3Validator, Draft4Validator, validators, ValidationError

import json
#from pprint import pprint


def validation(test_json):
    
    json_data = open('result_schema.json').read()
    validation_schema = json.loads(json_data)
    
    
    test_schema = json.loads(test_json)

    try:
        Draft4Validator.check_schema(validation_schema)
        return 'True'
    except ValidationError as e:
        return e




#json_data = open('validation_schema.json').read()
#json_data = open('generated_schema.json').read()

#json_data = open('generated_schema_try4.json').read()
#json_data = open('tin_can_schema.json').read()
#json_data = open('tin_can_schema_try4.json').read()
json_data = open('result_schema.json').read()

validation_schema = json.loads(json_data)




json_data=open('xapi_stmt_1.json').read()
#json_data=open('xapi_stmt_2.json').read()
#json_data=open('xapi_stmt_3.json').read()

test_schema = json.loads(json_data)




# Use a Draft4Validator
print "testing..."
Draft4Validator.check_schema(validation_schema)
print "schema is valid"


Draft4Validator(validation_schema).validate(test_schema)

#try:
    #Draft4Validator(validation_schema).validate(test_schema)
#except ValidationError as e:
    #print e.message

print "test json is valid "










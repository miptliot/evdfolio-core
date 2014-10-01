from jsonschema import Draft3Validator, Draft4Validator, validators, ValidationError
import json
import os


def validation(test_json):
    
    file_place = os.path.join(os.path.dirname(__file__) , 'result_schema.json')
    json_data = open(file_place).read()
    validation_schema = json.loads(json_data)
    
    test_schema = json.loads(test_json)

    try:
        Draft4Validator.check_schema(validation_schema)
        Draft4Validator(validation_schema).validate(test_schema)
        return 'True'
    except ValidationError as e:
        return e

##
#       dir(ValidationError)
##
#
#setabsolute_path
#absolute_schema_path
#args
#cause
#context
#create_from
#instance
#message
#parentpath
#relative_path
#relative_schema_path
#schema
#schema_path
#validator
#validator_value

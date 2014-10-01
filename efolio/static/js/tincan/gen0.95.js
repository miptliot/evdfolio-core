
// IE Compatability
if (!Array.prototype.indexOf) { 
        Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
                "use strict";
                if (this == null) {
                        throw new TypeError();
                }
                var t = Object(this);
                var len = t.length >>> 0;
                if (len === 0) {
                        return -1;
                }
                var n = 0;
                if (arguments.length > 1) {
                        n = Number(arguments[1]);
                        if (n != n) { // shortcut for verifying if it's NaN
                                n = 0;
                        } else if (n != 0 && n != Infinity && n != -Infinity) {
                                n = (n > 0 || -1) * Math.floor(Math.abs(n));
                        }
                }
                if (n >= len) {
                        return -1;
                }
                var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
                for (; k < len; k++) {
                        if (k in t && t[k] === searchElement) {
                                return k;
                        }
                }
                return -1;
        }
}
/*
language
provider_id
entry_id

actor_object_type
actor_name
actor_email

verb
verb_display
verb_url

object_url
object_type
object_def_name
object_def_description

result_score
result_success
result_completion

timestamp
*/

function generateFORM() {
    document.getElementById("language").value = 'ru-RU';
    document.getElementById("provider_id").value = '4';
    document.getElementById("entry_id").value = TinCan.Utils.getUUID();
    
    document.getElementById("actor_object_type").value = 'Agent';
    document.getElementById("actor_name").value = 'Masha';
    document.getElementById("actor_email").value = 'masha_2x@mipt.ru';
    
    document.getElementById("verb").value = 'passed';
    document.getElementById("verb_display").value = 'passed';
    document.getElementById("verb_url").value = 'http://adlnet.gov/expapi/verbs/passed';
    
    document.getElementById("object_url").value = "http://www.example.com/tincan/activities/" + randomString();;
    document.getElementById("object_type").value = 'activity';
    document.getElementById("object_def_name").value = 'Пример названия активности';
    document.getElementById("object_def_description").value = 'Пример описания активности';
    
    document.getElementById("result_score").value = '5';
    document.getElementById("result_success").value = 'true';
    document.getElementById("result_completion").value = 'true';
    
    document.getElementById("timestamp").value = '2014-10-24T08:04:06.003Z';
    
    
}
function generateJSON() {
        "use strict";
        var statement = {}, name;
        var locale = $("#language").val(),
        
//         lang_map = function(locale, object){
//             locale.forEach(function(i){
//                 console.info(i)
//             })
//         }
        
        name = document.getElementById("actor_name").value;
        if (isEmpty(locale) || !validateLocale(locale)) {
                displayError("Locale is not valid.");
                return;
        }
        if (isEmpty(document.getElementById("object_url").value)) {
                generateURL();
        }
        //identity
        statement.provider = document.getElementById("provider_id").value;
        statement.id = document.getElementById("entry_id").value
        // actor
        statement.actor = {};
        statement.actor.mbox = "" + document.getElementById("actor_email").value;
        if (!isEmpty(name))
                statement.actor.name = name;
        statement.actor.objectType = "Agent";
        // verb
        statement.verb = {};
        statement.verb.id = document.getElementById("verb_url").value;
        statement.verb.display = {};
        
        statement.verb.display[locale] = document.getElementById("verb_display").value;
        // object
        statement.object = {};
        statement.object.id = document.getElementById("object_url").value;
        statement.object.objectType = document.getElementById("object_type").value;
        statement.object.definition = {};
        statement.object.definition.name = {};
        statement.object.definition.name[locale] = document.getElementById("object_def_name").value;
        statement.object.definition.description = {};
        statement.object.definition.description[locale] = document.getElementById("object_def_description").value;
        
        //Validation
        // id
        if (isEmpty(statement.id)) {
            displayError("ID is required.");
            return;
        }
        // provider
        if (isEmpty(statement.provider)) {
            displayError("Provider is required.");
            return;
        }
        // actor
        if (isEmpty(statement.actor.mbox)) {
            displayError("Actor mbox is required.");
            return;
        }
        // verb
        if (isEmpty(statement.verb.id) || isEmpty(statement.verb.display[locale])) {
            displayError("Verb ID and Display are required.");
            return;
        }
        //object
        if (isEmpty(statement.object.id) || isEmpty(statement.object.objectType) || 
            isEmpty(statement.object.definition.name[locale]) || isEmpty(statement.object.definition.description[locale])){
            displayError("Object ID, Type, Name, and Description fields are required.");
        return;
        }
        // Validate Activity is a URI
        if (!validateUri(statement.object.id)){
            displayError("ActivityID must be a URI.");
            return;
        }
        // Validate email
        if (!validateEmail(statement.actor.mbox)) {
            displayError("Actor Email " + statement.actor.mbox + " is not valid.");
            return;
        }
        if (!isEmpty(statement.object.objectType) && (statement.object.objectType.toLowerCase() !== "activity")) {
            displayError("Statement generator can only use object type of activity.");
            return;
        }
        
        var text = JSON.stringify(statement, undefined, 4);
        document.getElementById("entry_json").value = text;
        enablePost();
}
function validateJSON(noisy) {
    var jsonString = document.getElementById("entry_json").value;
        var obj;
        var arr = [];
        try {
                obj = jQuery.parseJSON(jsonString);
        } catch(e) {
                displayError("An error has occured during parsing: " + e.message);
                return;
        }
        if (obj == null) {
                displayError("There is no data to validate.");
                return;
        }
        
        if (obj.id == undefined || obj.id == '') {
            displayError("Id field is required.");
            return;
        }
        if (obj.provider == undefined || obj.id == '') {
            displayError("provider field is required.");
            return;
        }
        if (obj.verb == undefined || obj.id == '') {
                displayError("Verb field is required.");
                return;
        }
        if (obj.actor == undefined || obj.actor.mbox == undefined || obj.actor.objectType == undefined) {
                displayError("Actor must be defined with mbox field and objectType.");
                return;
        }
        // Validate Verb
        if (!validateUri(obj.verb.id)) {
                displayError("Verb " + obj.verb.id + " is not a valid uri");
                return;
        }
        if (obj.verb.id === "http://adlnet.gov/expapi/verbs/voided") {
                displayError("Use of the reserved verb voided is forbidden in the Statement Generator.");
                return;
        }
        // Validate ActivityID
        if (obj.object == undefined || obj.id == '') {
                displayError("Statement object must be defined.");
                return;
        }
        if (obj.object.id == undefined || obj.id == '') {
                displayError("Statement object id must be defined.");
                return;
        }
        if (!validateUri(obj.object.id)) {
                displayError("ActivityID " + obj.object.id + " is not a valid URI.");
                return;
        }
        if (!validateEmail(String(obj.actor.mbox))) {
                displayError("E-Mail " + obj.actor.mbox + " is not a valid email address.");
                return;
        }
        // Validate object definition if it exists
        if (obj.object.definition != null) {
                // Create an array of locales to validate all names have a matching description
                // Validate locale for name
                for (var k in obj.object.definition.name) { // Easy way to get the key map
                        if (!validateLocale(k)){
                                displayError("Locale " + k + " for object.definition.name is not a valid locale.");
                                return;
                        }
                        arr.push(k);
                }
                if (obj.object.definition.description != null) {
                        // Validate locale for description
                        var matches = 0;
                        for (var k in obj.object.definition.description) {
                                if (!validateLocale(k)){
                                        displayError("Locale " + k + " for object.definition.description is not a valid locale.");
                                        return;
                                }
                                if (jQuery.inArray(k, arr) == -1) {
                                        displayError("Description with locale " + k + " does not have a matching name.");
                                        return;
                                }
                                matches++;
                        }
                        // Validate both locales are the same
                        if (matches !== arr.length) {
                                displayError("Name contains a locale definition not found in description.");
                                return;
                        }
                }
        }
        // End validation
        if (noisy) {
                alert("Basic statement validation completed successfully.");
        }
        enablePost();
        
        return false;
}
function isEmpty(str) {
        return (!str || !str.length);
}
function convertLineBreaks(str) {
        return str.split("<br/>").join("\n");
}
function validateUri(uri) {
        return (uri.indexOf(":") > 0 && uri.indexOf(":") !== (uri.length - 1));
}
function validateEmail(email) {
        var expr = /\S+@\S+\.\S+/;
        var regex = new RegExp(expr);
        return email.match(regex);
}
// function validateEmailPrefix(email) {
//         var prefix = "mailto:";
//         return email.substr(0, prefix.length) === prefix;
// }
function validateLocale(locale) {
        // Should consolidate this into one regex but I was having no luck
        var expr = /[a-z][a-z]-[a-z][a-z]/i;
        var expr2 = /[a-z][a-z]/i;
        var regex = new RegExp(expr);
        var regex2 = new RegExp(expr2);
        return (locale.match(regex) && locale.length === 5) || (locale.match(regex2) && locale.length === 2);
}/*
function post() {
        var data,
                endpoint,
                extraHeaders = {};
        disableLrs();
        extraHeaders["X-Experience-API-Version"] = "1.0.0";
        if (validateJSON(0)) {
                disablePost();
                data = document.getElementById("jsonText").value;
                endpoint = document.getElementById("endpoint").value + "/statements";
                XHR_request(null, endpoint, 'POST', data, auth(), done, false, extraHeaders, failed);
        }
}
function auth() {
        var username,
                password;
        username = document.getElementById("username").value;
        password = document.getElementById("password").value;
        return "Basic " + encode64(username + ":" + password);
}
function done() {
        alert("POST has completed successfully.");
        enablePost();
        enableLrs();
}
function failed() {
        enableLrs();
}
function togglePost() {
        if (isEmpty(document.getElementById("jsonText").value)) {
                disablePost();
        } else {
                enablePost();
        }
}*/
function displayError(message) {
        alert(message);
        disablePost();
}
function randomString() {
        var text = [];
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var length = 8;
        for( var i=0; i < length; i++ )
                text.push(possible.charAt(Math.floor(Math.random() * possible.length)));
        return text.join('');
}
function disablePost() {
    document.getElementById("post").disabled = 'disabled';
}
function enablePost() {
    document.getElementById("post").disabled = '';
}

// Generate random URL
function generateURL() {
        var text = "http://www.example.com/tincan/activities/" + randomString();
        document.getElementById("object_url").value = text;
}
function selectionChanged() {
        var selected = document.getElementById("verb").selectedIndex, verbUri = "http://adlnet.gov/expapi/verbs/", verbDisplay;
        switch (selected) {
                case 0:
                        break;
                case 1:
                        verbDisplay = "answered";
                        break;
                case 2:
                        verbDisplay = "attempted";
                        break;
                case 3:
                        verbDisplay = "attended";
                        break;
                case 4:
                        verbDisplay = "completed";
                        break;
                case 5:
                        verbDisplay = "created";
                        break;
                case 6:
                        verbDisplay = "experienced";
                        break;
                case 7:
                        verbDisplay = "failed";
                        break;
                case 8:
                        verbDisplay = "imported";
                        break;
                case 9:
                        verbDisplay = "interacted";
                        break;
                case 10:
                        verbDisplay = "passed";
                        break;
                case 11:
                        verbDisplay = "shared";
                        break;
        }
        if (verbDisplay) {
                verbUri += verbDisplay;
                document.getElementById("verb_url").value = verbUri;
                document.getElementById("verb_display").value = verbDisplay;
                document.getElementById("language").value = "en-US";
        }
}
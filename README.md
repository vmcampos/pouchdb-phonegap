pouchdb-phonegap
================

PouchDB and PhoneGap with jQuery Mobile

A proof of concept for PouchdDB implemented in PhoneGap/Cordova, with jQuery Mobile.

The project has two screens (Home and My Classes). In "My Classes," a user enters a unique class number, class title, and instructor name and that information is saved to the internal and persistent database. A user may remove any class, thereafter.

Tested to work on Android 4.1.2+ (an LG 730). Does not seem to work on Android 2.3.4 (a Droid X). 

The project was set up in PhoneGap 2.9.0, with all defaults.

Suggestions to run the project yourself: in Eclipse with Android Developer Tools, load the PhoneGap "example" project, and replace its "index.html" with this one; include the "custom.ext.js" as well.


Changelog:
Updated to latest jQuery Mobile CDN.
Updated to latest PouchDB CDN.
Updated all "div" elements to Semantic HTML5.


Notes:
Implementing PouchDB in PhoneGap/Cordova requires all relevant code to exist in "onDeviceReady()" as per: 
https://github.com/pouchdb/pouchdb/wiki/PouchDB-on-Phonegap

Original concept to capture user data is based on:
"PouchDB Jump Start" by Haim Michael - http://youtu.be/JzuQ5tjh9X0


To-do:
Needs more error-checking when data is entered.
Test on newer PhoneGap/Cordova.
Use "native" alert boxes.
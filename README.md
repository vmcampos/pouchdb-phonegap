pouchdb-phonegap
================

Work in progress: trying to get PouchDB to work in PhoneGap/Cordova on Android

PROBLEMS SO FAR:
All the PouchDB code is added to the onDeviceReady() function that fires after "deviceready".
After clicking on the "Add Class" button, the console reports that "addClasses()" is not found. 
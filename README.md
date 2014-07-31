pouchdb-phonegap
================

Work in progress: trying to get PouchDB to work in PhoneGap/Cordova on Android as-is.

PROBLEMS SO FAR:
All the PouchDB code is added to the onDeviceReady() function that fires after "deviceready".
The addClasses() and showClasses() functions are accessible now, and everything seems to work on an emulator.
BUT it doesn't seem to work on an LG 730 Android 4.1.2 device. 
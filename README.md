# AEB1011 Exercises - ionic Boilerplate
This branch contains a simple boilerplate to build an hybrid mobile app for contact management using [ionic framework](http://ionicframework.com/).

# Getting started
In order to work with this branch and start building your app you must first install and configure the following development tools.

* [Java JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* [Apache Ant](http://ant.apache.org/)
* [Git](https://git-scm.com/downloads)
* [Nodejs](https://nodejs.org/en/)
* [Apache cordova](https://cordova.apache.org/)
* [Android SDK](https://developer.android.com/studio/index.html)
* [Console](https://sourceforge.net/projects/console/) (optional for Windows users)
* [ionic framework](http://ionicframework.com/)

Please refer to the [wiki](https://github.com/haxdai/AEB1011Exercises/wiki/Development-Tools) for information on how to install the required tools for your OS.

## App structure
A default blank app is preconfigured with the following folder structure:

````bash
├── bower.json        //bower dependencies
├── config.xml        //Cordova configuration
├── gulpfile.js       //Gulp tasks
├── ionic.config.json // ionic configuration
├── package.json      // node dependencies
├── README.md         //This file
├── hooks/            // custom cordova hooks to execute on specific commands 
├── platforms/        // iOS/Android specific builds will reside here
├── plugins/          // where your cordova/ionic plugins will be installed
├── scss/             // scss code, which will output to www/css/
└── www/              // application - JS code and libs, CSS, images, etc.
````
## Testing the app
In order to test the app you will need to add target platforms, generate the distribution packages and emulate or install those packages in the target platform.

### Add target platforms

To add iOS target platform (you must be using Mac OS X and have XCode installed)
````sh
ionic platform add ios
````

An app called contacts.app is generated in /platforms/ios/build

To add Android target platform
````sh
ionic platform add android
````

### Build the app

To build the iOs app package

````sh
ionic build ios
````

To build the Android app package

````sh
ionic build android
````

An apk called _android-debug.apk_ is generated in /platforms/android/build/outputs/apk/

### Test the app using emulators

To emulate the iOs app

````sh
ionic emulate iOs
````

To emulate the Android app

````sh
ionic emulate android
````
# AEB1011 Exercises - HTML Boilerplate
This branch contains a simple boilerplate to build a Web app for contacts management.

##What's included

* jQuery 1.12.4
* Bootstrap 3.3.7
* Font awesome 4.6.3

## App structure
This boilerplate contains the bare minimum to start building a contact management app. The app contains the following folder structure:

````bash
├── index.html -- main Web page
├── README.md -- this file
├── css/
│   ├── vendor/
│   │   ├── bootstrap.css
│   │   ├── bootstrap.css.map
│   │   ├── bootstrap.min.css
│   │   ├── bootstrap.min.css.map
│   │   ├── bootstrap-theme.css
│   │   ├── bootstrap-theme.css.map
│   │   ├── bootstrap-theme.min.css
│   │   ├── bootstrap-theme.min.css.map
│   │   ├── font-awesome.css
│   │   └── font-awesome.min.css
│   └── fonts/
│       ├── fontawesome-webfont.eot
│       ├── fontawesome-webfont.svg
│       ├── fontawesome-webfont.ttf
│       ├── fontawesome-webfont.woff
│       ├── fontawesome-webfont.woff2
│       ├── FontAwesome.otf
│       ├── glyphicons-halflings-regular.eot
│       ├── glyphicons-halflings-regular.svg
│       ├── glyphicons-halflings-regular.ttf
│       ├── glyphicons-halflings-regular.woff
│       └── glyphicons-halflings-regular.woff2
├── js/
│   ├── main.js -- main app file
│   └── vendor/
│       ├── bootstrap.js
│       ├── bootstrap.min.js
│       ├── jquery.js
│       ├── jquery.min.js
│       ├── jquery.min.map
│       └── npm.js
└── mocks/
    └── MOCK_DATA.json -- mock contacts data
````
## Testing the app
In order to test the app you will need an HTTP server, otherwise, you must get errors on CORS requests.

### Using http-server
Assuming that you have [node js](https://nodejs.org/en/) and [git](https://git-scm.com/) properly installed in your OS:

````bash
npm install -g http-server
git clone https://github.com/haxdai/AEB1011Exercises.git
cd AEB1011Exercises
http-server -p 9090
````

http-server will wait for requests in port 9090, open your browser with url localhost:9090/index.html

### Using brackets IDE
Brackets includes an HTTP server and does live reloading with chrome. To test your app using brackets:

1. Open the folder app in the IDE
2. Open index.html in the IDE
3. Click the Live Preview button

Chrome will launch showing your index page, as long as the Live Preview is enabled, changes in app files will take effect as soon as you save. For more information visit the [Brackets WebPage](http://brackets.io/).
# AEB1011 Exercises - HTML Contact List
This branch adds code to _main.js_ to load contact data from _MOCK_DATA.json_ and dynamically renders the contact list using jQuery DOM manipulation. A screenshot of the app is presented below.

<p align="center">
    <img src="https://github.com/haxdai/AEB1011Exercises/raw/master/assets/contactlistview2.png" width="200px"/>
</p>

## Files changed

* contacts.html
* js/main.js

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
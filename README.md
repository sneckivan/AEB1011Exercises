# AEB1011 Exercises - User creation via JSON API
This branch implements AJAX calls to REST API for user creation and login.

## Files changed

* js/main.js
* js/vendor/toastr.min.js (new)
* css/vendor/toastr.min.css (new)
* signup.html
* login.html

## About the API
The REST API used in the examples (and from now on) is implemented using [deployd](http://deployd.com/), an Open Source platform for building APIs for Web and mobile applications. A version of the API is hosted in heroku at https://ittcontactslist.herokuapp.com/

### Collections
The API has two collections available: the **users** collection, which contains all user data; and the **contacts** collection which holds contact information associated with a user account.

#### Users collection schema
An example document in the users collection is presented below to introduce its schema:

````json
{
    id: 999bec71e30188d9,
    username: "haxdai",
    password: "98798723kjhkjchksjkjhasd"
}
````

|field|required|description|
|-|-|-|
|id|yes|Document's ID generated automatically by deployd|
|username|yes|User name for creation / login|
|password|yes|User password for creation / login. Deployd automatically hashes this field|

#### Users resource API operations
The following table describes allowed operations on user collection over HTTP calls.

|Operation|HTTP Method|Route|Accepts|Returns|
|-|-|-|-|-|
|List users|GET|/users|Nothing|An array of objects|
|Create a user|POST|/users|A single object|The saved object (or errors)|
|Get a specific user|GET|/users/&lt;id&gt;|Nothing|A single object|
|Update a specific user|PUT|/users/&lt;id&gt;|A single object|The saved object (or errors)|
|Delete a specific user|DELETE|/users/&lt;id&gt;|A single object|Nothing|
|Log in a specific user|POST|/users/login|username and password of user|User plus session cookie (or error)|
|Log out a specific user|POST|/users/logout|Nothing|Nothing|
|Get current user in session|GET|/users/me|Nothing|A single object|

#### Contacts collection schema
An example document in the contacts collection is presented below to introduce its schema:

````json
{
    id: 765bec71e3018het,
    firstname: "hasdai,
    lastname: "pacheco",
    email: "me@test.com",
    gender: "M",
    phoneNumbers: [
        {type: "work", number:"772728882"},
        {type: "home", number:"993993888"}
    ],
    favorite: true,
    socialNetworks: [
        {name: "facebook", sid:"haxdai"},
        {name: "twitter", sid:"@haxdai"}
    ],
    owner: "999bec71e30188d9"
}
````

|field|required|description|
|-|-|-|
|id|yes|Document's ID generated automatically by deployd|
|firstname|yes|Contact's first name|
|lastname|yes|Contact's last name|
|email|yes|Contact's email|
|gender|no|Contact's gender|
|phoneNumbers|yes|Array of objects containing phone numbers for the contact|
|favorite|no|Whether the contact is marked a fevorite|
|socialNetworks|no|Array of objects containing social IDs for contact|
|owner|yes|Owner of the contact (creator)|

#### Contacts resource API operations
The following table describes allowed operations on contacts collection over HTTP calls.

|Operation|HTTP Method|Route|Accepts|Returns|
|-|-|-|-|-|
|List contacts|GET|/contacts|Nothing|An array of objects|
|Create a contact|POST|/contacts|A single object|The saved object (or errors)|
|Get a specific contact|GET|/contacts/&lt;id&gt;|Nothing|A single object|
|Update a specific contact|PUT|/contacts/&lt;id&gt;|A single object|The saved object (or errors)|
|Delete a specific contact|DELETE|/contacts/&lt;id&gt;|A single object|Nothing|

The API is configured by default to retrieve only contacts whose owner (creator) corresponds to the logged in user. This means that to list contacts you must first log in to the app using the appropiate API request.

### Testing the API using curl
You can use curl to test API operations over HTTP calls. For example, to log in a user:


```sh
curl -H "Content-Type: application/json" -X POST -d '{"username":"haxdai", "password":"myPassword"}' https://ittcontactslist.herokuapp.com/users/login
```

If login succeded, the output will be something like:

```bash
{"path":"/users","id":"cf0f38f59983c5fb2ed70b0c65c82bd8cdc75e0d1effd4a39c680abd0660b8f07f014fae7d26b8ff01ae329989d29f0171ba7c2792f8d4fa3f341eacf69a7559","uid":"999bec71e30188d9"}
```

If credentials are not valid:

```sh
{"message":"bad credentials","status":401}
```

### Testing the API using jQuery
An example of user login using jQuery AJAX is shown below.

```javascript
$.ajax({
  url: "https://ittcontactslist.herokuapp.com/users/login",
  method: "POST",
  dataType: "json",
  accepts: {
    json: "application/json"
  },
  data: {
    username: "haxdai",
    password: "myPassword"
  }
})
.done(function(response){
  console.log(response);
})
```

Once logged in, you must send credentials with every API request. jQuery does not include credentials by default, so your API calls must include them explicitly using <code>xhrFields: {withCredentials: true}</code>. A code snippet to get contact list is shown below.

```javascript
$.ajax({
  url: "https://ittcontactslist.herokuapp.com/contacts",
  method: "GET",
  dataType: "json",
  xhrFields: {
    withCredentials: true
  },
  accepts: {
    json: "application/json"
  }
})
.done(function(data) {
  console.log(data);
});

```

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
(function(window, $) {
    var endpoint = "https://ittcontactslist.herokuapp.com/";
    //var endpoint = "http://localhost:2403/",
        alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        headerTemplate = "<li><h4>__LETTER__</h4></li>",
        contactTemplate = "<li class='media'><div class='media-left'><img class='media-object img-circle contact-photo' src='__AVATAR__' /></div><div class='media-body'><h4 class='media-heading'>__NAME__</h4>__TITLE__<div class='btn-group pull-right' role='group'><a href='#' data-toggle='modal' data-target='#contactDetail' class='btn btn-default'><span class='fa fa-eye'></span></a><a href='contactForm.html?id=__USERID__' class='btn btn-default'><span class='fa fa-pencil'></span></a><a href='#' class='btn btn-default'><span class='fa fa-trash'></span></a></div></div></li><hr>",
        isLoggedIn = false;
    
    
    //Configure toastr options
    if (window.toastr) {
        toastr.options.hideDuration = 200; //Hide after 200ms
        toastr.options.positionClass = "toast-top-full-width"; //show toast top full width
        toastr.options.preventDuplicates = true; //prevent duplicated toasts
    }
    
    //Check if user is logged in, redirect to login page if not
    if (location.href.endsWith("contacts.html") || location.href.endsWith("contactForm.html")) {
        $.ajax({
            url: endpoint+"users/me",
            type: "GET",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            accepts: {
                json: "application/json"
            }
        })
        .done(function(response) {
            if (response && response.username) {
                isLoggedIn = true;
            } else {
                location.href = "login.html";
            }
        });
    }
    
    //Initialize contact Form on contactForm.html
    if ($("form#contactForm").length) {
        //Check for contact ID in URL
        var id = getQueryStringParam("id"), method="POST";
        
        if (id && id.length) {
            //Get contact info
            $.ajax({
                url: endpoint+"contacts/"+id,
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
                //Pre-fill form data
                if (data && data.id) {
                    $("#inputFName").attr("value",data.firstname);
                    $("#inputLName").attr("value",data.lastname);
                    $("#inputEmail").attr("value",data.email);
                    $("#inputTitle").attr("value",data.jobTitle || "");
                    $("#inputPNumber").attr("value",data.phoneNumbers.length && data.phoneNumbers[0].number);
                    $("#inputFbID").attr("value",data.socialNetworks.length && data.socialNetworks[0].sid);
                    $("#inputTwID").attr("value",data.socialNetworks.length && data.socialNetworks[1].sid);
                    
                    method="PUT";
                }
            });
        }
        
        $("form#contactForm").on("submit", function(evt) {
            //Form data placeholder
            var formPayload = {phoneNumbers:[], socialNetworks: []};

            if (method == "PUT") { formPayload.id = id; }
            //Gather form input values and create object
            var dt = $(this).serializeArray()
                .forEach(function(item) {
                    if (item.name === "twID") {
                        formPayload.socialNetworks.push({name:"twitter", sid: item.value});
                    } else if (item.name === "fbID") {
                        formPayload.socialNetworks.push({name:"facebook", sid: item.value});
                    } else if (item.name === "phone") {
                        formPayload.phoneNumbers.push({type:"home", number: item.value});
                    } else {
                        formPayload[item.name] = item.value;
                    }
                });

            //Send AJAX request to create contact
            $.ajax({
                url: endpoint+"contacts",
                type: method,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                accepts: {
                    json: "application/json"
                },
                data: formPayload
            })
            .done(function(response) {
                if (response && response.id) {
                    location.href = "contacts.html";
                }
            })
            .error(function(error) {
                if (error.responseJSON && error.responseJSON.message) {
                    toastr.error(error.responseJSON.message);
                } else {
                    toastr.error("An error occurred, try again later");
                }
            });
            
            //Prevent default submit behavior
            evt.preventDefault();
        });
    }
    
    //Initialize sign-up form on signup.html
    if ($("form#signupForm").length) {
        $("form#signupForm").on("submit", function(evt) {
            //Form data placeholder
            var formPayload = {};

            //Gather form input values and create object
            var dt = $(this).serializeArray().forEach(function(item){
                formPayload[item.name] = item.value;
            });

            //Send AJAX request to create user
            $.ajax({
            	url: endpoint+"users",
            	type: "POST",
            	dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
            	accepts: {
            		json: "application/json"
            	},
            	data: formPayload
            })
            .done(function(response) {
                if (response && response.username && response.id) {
                    toastr.success("User "+response.username+" created, please <a href='login.html'>Sign in</a>");
                }
            })
            .error(function(error) {
                if (error.responseJSON && error.responseJSON.message) {
                    toastr.error(error.responseJSON.message);
                } else {
                    toastr.error("An error occurred, try again later");
                }
            });
            
            //Prevent default submit behavior
            evt.preventDefault();
        });
    }
    
    //Initialize login form on login.html
    if ($("form#loginForm").length) {
        $("form#loginForm").on("submit", function(evt) {
            //Form data placeholder
            var formPayload = {};

            //Gather form input values and create object
            var dt = $(this).serializeArray().forEach(function(item){
                formPayload[item.name] = item.value;
            });

            //Send AJAX request to log user
            $.ajax({
            url: endpoint+"users/login",
            type: "POST",
            dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
            accepts: {
            json: "application/json"
            },
            data: formPayload//JSON.stringify(formPayload)
            })
            .done(function(response) {
                if (response.uid) {
                    location.href = "contacts.html";
                }
            })
            .error(function(error) {
                if (error.responseJSON && error.responseJSON.message) {
                    toastr.error(error.responseJSON.message);
                } else {
                    toastr.error("An error occurred, try again later");
                }
                
            });
            
            //Prevent default submit behavior
            evt.preventDefault();
        });
    }

    //Initialize log out button
    $("a#logoutButton").on("click", function(evt) {
        $.ajax({
            url: endpoint+"users/logout",
            type: "POST",
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            accepts: {
                json: "application/json"
            }
        })
        .done(function() {
            location.href = "login.html";    
        });
        
        //Prevent default click behavior
        evt.preventDefault();
    });
    
    //Initialize contact Form on contactForm.html
    if ($("form#contactForm").length) {
        //Check for contact ID in URL
        var id = getQueryStringParam("id"), method="POST";
        
        if (id && id.length) {
            //Get contact info
            $.ajax({
                url: endpoint+"contacts/"+id,
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
                //Pre-fill form data
                if (data && data.id) {
                    $("#inputFName").attr("value",data.firstname);
                    $("#inputLName").attr("value",data.lastname);
                    $("#inputEmail").attr("value",data.email);
                    $("#inputTitle").attr("value",data.jobTitle || "");
                    $("#inputPNumber").attr("value",data.phoneNumbers.length && data.phoneNumbers[0].number);
                    $("#inputFbID").attr("value",data.socialNetworks.length && data.socialNetworks[0].sid);
                    $("#inputTwID").attr("value",data.socialNetworks.length && data.socialNetworks[1].sid);
                    
                    method="PUT";
                }
            });
        }
        
        $("form#contactForm").on("submit", function(evt) {
            //Form data placeholder
            var formPayload = {phoneNumbers:[], socialNetworks: []};

            if (method == "PUT") { formPayload.id = id; }
            //Gather form input values and create object
            var dt = $(this).serializeArray()
                .forEach(function(item) {
                    if (item.name === "twID") {
                        formPayload.socialNetworks.push({name:"twitter", sid: item.value});
                    } else if (item.name === "fbID") {
                        formPayload.socialNetworks.push({name:"facebook", sid: item.value});
                    } else if (item.name === "phone") {
                        formPayload.phoneNumbers.push({type:"home", number: item.value});
                    } else {
                        formPayload[item.name] = item.value;
                    }
                });

            //Send AJAX request to create contact
            $.ajax({
                url: endpoint+"contacts",
                type: method,
                dataType: "json",
                xhrFields: {
                    withCredentials: true
                },
                accepts: {
                    json: "application/json"
                },
                data: formPayload
            })
            .done(function(response) {
                if (response && response.id) {
                    location.href = "contacts.html";
                }
            })
            .error(function(error) {
                if (error.responseJSON && error.responseJSON.message) {
                    toastr.error(error.responseJSON.message);
                } else {
                    toastr.error("An error occurred, try again later");
                }
            });
            
            //Prevent default submit behavior
            evt.preventDefault();
        });
    }
    
    //Function to acces query string parameters
    function getQueryStringParam (paramName) {
		if (!paramName) return "";
		if (window.location.search) {
  			return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(paramName).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
		}
	};
    
    //Function to render contacts
    function renderContacts(data) {
        //Get first letter to start
        var idx = alphabet.indexOf(data[0].firstname.toUpperCase().charAt(0));
        var letter = alphabet.charAt(idx);

        //Append first letter header
        $("ul#contactsContainer").append(headerTemplate.replace("__LETTER__", letter));

        //Traverse contact data
        data.forEach(function(item) {
            var nameLetter = item.firstname.toUpperCase().charAt(0);
            //If name letter and header letter are not equal must forward idx to next letter
            if (nameLetter !== letter) {
                while(nameLetter !== letter) {
                    idx++;
                    letter = alphabet.charAt(idx);
                }

                //Append letter header
                $("ul#contactsContainer").append(headerTemplate.replace("__LETTER__", letter));
            }
            //Append contact entry
            $("ul#contactsContainer").append(contactTemplate.replace("__NAME__", item.firstname+" "+item.lastname).replace("__TITLE__", item.jobTitle).replace("__AVATAR__", item.avatar ? item.avatar : "css/images/userPlaceHolder.jpg").replace("__USERID__", item.id));
        });
    };
    
    //Get data and work on it for contacts.html
    if ($("ul#contactsContainer").length) {
        $("ul#contactsContainer").append("<div class='text-center'><span class='fa fa-spinner fa-spin fa-2x'></span></div>");
        $.ajax({
            url: endpoint+"contacts",
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
            $("ul#contactsContainer").empty();
            if (data.length) {
                
                //Sort data alphabetically by firstname
                if (data.length > 1) {
                    data.sort(function(a, b) {
                        if (a && a.firstname && b && b.firstname) {
                            var x = a.firstname;
                            var y = b.firstname;
                            if (x < y) {return -1;}
                            if (x > y) {return 1;}
                        }
                        return 0;
                    });
                }

                renderContacts(data);
            } else {
                $("ul#contactsContainer").append("No contacts available. <a href='contactForm.html'>Add your first contact</a>");
            }
        });
    }
})(window, $)
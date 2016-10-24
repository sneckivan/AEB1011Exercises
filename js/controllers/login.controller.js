(function() {
    'use strict';
    
    angular
        .module("ContactsApp")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["$location", "loginservice"];
    
    function LoginController($location, loginservice) {
        /* jshint validthis: true */
        var lc = this;
        
        lc.email = '';
        lc.login = doLogin;
        lc.password = '';
            
        function doLogin() {
            loginservice.login(lc.email, lc.password)
                .then(function(response) {
                    $location.path("/contacts");
                });
        };
    };
})();
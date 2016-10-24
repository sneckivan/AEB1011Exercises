(function() {
    'use strict';
    
    angular
        .module("ContactsApp")
        .controller("ContactsController", LoginController);

    LoginController.$inject = ["$location", "$scope", "contactsservice", "loginservice"];
    
    function LoginController($location, $scope, contactsservice, loginservice) {
        /* jshint validthis: true */
        var cc = this;
        cc.contacts = [];
        cc.logout = logout;
        
        getContacts();
        
        function getContacts() {
            return contactsservice.getContacts()
                .then(function(data){
                    cc.contacts = data;
                });
        };
        
        function logout() {
            loginservice.logout().then(function(data) {
                $location.path('/login');
            });
        };
    };
})();
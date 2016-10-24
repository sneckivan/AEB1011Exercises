(function() {
    'use strict';
    
    angular
        .module("ContactsApp")
        .factory("contactsservice", contactsservice);
    
    contactsservice.$inject = ['$http'];
    function contactsservice($http) {
        return {
            getContacts: getContacts,
        };
        
        function getContacts() {
            return $http.get("https://ittcontactslist.herokuapp.com/contacts",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    withCredentials: true
                })
            .then(getAllContacts);
        };
        
        function getAllContacts(response) {
            return response.data;
        }
    }
})();
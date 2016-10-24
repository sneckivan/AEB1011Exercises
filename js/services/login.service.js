(function() {
    'use strict';
    
    angular
        .module("ContactsApp")
        .factory("loginservice", loginservice);
    
    loginservice.$inject = ['$http', '$rootScope'];
    
    function loginservice($http, $rootScope) {
        return {
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn
        };
        
        function isLoggedIn() {
            return $http.get("https://ittcontactslist.herokuapp.com/users/me",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    withCredentials: true
                })
            .then(isUserLoggedIn);
        };
        
        function login(user, password) {
            return $http.post("https://ittcontactslist.herokuapp.com/users/login", {
                    username:user,
                    password:password
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    withCredentials: true
                })
            .then(loginUser);
        };
        
        function logout() {
            return $http.post("https://ittcontactslist.herokuapp.com/users/logout",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    withCredentials: true
                })
            .then(logoutUser);
        };
        
        function loginUser(response) {
            $rootScope.user = response.data.uid;
            return response.data.results;
        };
        
        function logoutUser(response) {
            $rootScope.user = undefined;
            return response.data;
        };
        
        function isUserLoggedIn(response) {
            return response.data.uid || undefined;
        }
    }
})();
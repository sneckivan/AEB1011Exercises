(function() {
    'use strict';
    
    angular
        .module("ContactsApp")
        .config(config)
        .run(run);
    
    config.$inject = ["$routeProvider"];
    function config($routeProvider) {
        $routeProvider
        .when("/login", {
            templateUrl: "templates/login.html",
            controller: "LoginController",
            controllerAs: "login"
        })
        .when("/contacts", {
            templateUrl: "templates/contacts.html",
            controller: "ContactsController",
            controllerAs: "contacts"
        })
        .otherwise({redirectTo:"/login"});
    }
    
    run.$inject = ['$rootScope', '$location', 'loginservice'];
    function run($rootScope, $location, loginservice) {
        $rootScope.user = loginservice.isLoggedIn();
        
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var restrictedPage = ['/login', '/register', '/contacts'].indexOf($location.path()) > -1;
            var loggedIn = $rootScope.user;
            
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            } else {
                $location.path('/contacts');
            }
        });
    }
})();
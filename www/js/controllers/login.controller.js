(function() {
    'use strict';
    
    angular
        .module('Contacts.controllers')
        .controller('LoginCtrl', LoginController);
    
    LoginController.$inject = ["$scope", "$timeout", "$stateParams", "ionicMaterialInk"];
    function LoginController($scope, $timeout, $stateParams, ionicMaterialInk) {
        $scope.$parent.clearFabs();
        $timeout(function() {
            $scope.$parent.hideHeader();
        }, 0);
        ionicMaterialInk.displayEffect();
    };
    
})();
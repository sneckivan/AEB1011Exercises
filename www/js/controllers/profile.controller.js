(function() {
    'use strict';
    
    angular
        .module('Contacts.controllers')
        .controller('ProfileCtrl', ProfileController);
    
    ProfileController.$inject = ["$scope", "$stateParams", "$timeout", "ionicMaterialMotion", "ionicMaterialInk"];
    function ProfileController($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
        // Set Header
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = false;
        $scope.$parent.setExpanded(false);
        $scope.$parent.setHeaderFab(false);

        // Set Motion
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();
    };
    
})();
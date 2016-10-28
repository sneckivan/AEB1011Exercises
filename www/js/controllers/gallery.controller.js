(function() {
    'use strict';
    
    angular
        .module('Contacts.controllers')
        .controller('GalleryCtrl', GalleryController);
    
    GalleryController.$inject = ["$scope", "$stateParams", "$timeout", "ionicMaterialInk", "ionicMaterialMotion"];
    function GalleryController($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
        $scope.$parent.showHeader();
        $scope.$parent.clearFabs();
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
        $scope.$parent.setHeaderFab(false);

        // Activate ink for controller
        ionicMaterialInk.displayEffect();

        ionicMaterialMotion.pushDown({
            selector: '.push-down'
        });
        ionicMaterialMotion.fadeSlideInRight({
            selector: '.animate-fade-slide-in .item'
        });
    };
    
})();
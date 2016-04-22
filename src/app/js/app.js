'use strict';

/* App Module */

var greenspaceApp = angular.module('greenspaceApp', [
  'ui.router',
  'greenspaceControllers'
]);


greenspaceApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            views: {
              'main': {
                url:"",
                templateUrl: 'partials/greenspace-list.html',
                controller: 'GreenspaceListCtrl'  
              }
            }
            
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
              'nav': {
                url:"",
                templateUrl: 'partials/header.html',
                controller: 'HeaderCtrl'  
              },
              'main': {
                url:"",
                templateUrl: 'partials/about.html',
              }
            }
        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('terms', {
            url: '/terms',
            views: {
              'nav': {
                url:"",
                templateUrl: 'partials/header.html',
                controller: 'HeaderCtrl'  
              },
              'main': {
                url:"",
                templateUrl: 'partials/terms.html',
              }
            }
        })
        

        .state('detail', {
            url: '/:id',
            views: {
              'nav': {
                url:"",
                templateUrl: 'partials/header.html',
                controller: 'HeaderCtrl'  
              },
              'main': {
                url:"",
                templateUrl: 'partials/greenspace-detail.html',
                controller: 'GreenspaceDetailCtrl', 
              }
            }
        });

        
});

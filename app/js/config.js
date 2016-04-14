'use strict';
//configure the routes for the app
app.config(function($routeProvider) {
    $routeProvider. 
       when('/', {
         templateUrl: 'app/views/address-book.html',
         controller: 'touchnoteCtrl as ctrl'
       }).
       otherwise({
         redirectTo: '/'
       });
});
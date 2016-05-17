require('angular');
require('angular-route');

var angular = window.angular;

var teamApp = angular.module('TeamApp', ['ngRoute']);

require('./auth')(teamApp);//looks for the default index.js file
require('./services')(teamApp);//looks for the default index.js file
require('./controllers')(teamApp);//looks for the default index.js file
require('./directives')(teamApp);//looks for the default index.js file

teamApp.config(['$routeProvider', function(routes) {
  routes
    .when('/signup', {
      controller: 'SignupController',
      templateUrl: '/views/sign_up_in_view.html'
    })
    .when('/signin', {
      controller: 'SigninController',
      templateUrl: '/views/sign_up_in_view.html'
    })
    .when('/', {
      redirectTo: '/signin'
    })
    .when('/home', {
      //controller: 'Controller',
      templateUrl: '/views/main_view.html'
    })
    .otherwise({
      templateUrl: '/views/four_oh_four.html'
    });
}]);

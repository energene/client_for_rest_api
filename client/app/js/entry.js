require('angular');
require('angular-route');

var angular = window.angular;

var teamApp = angular.module('TeamApp', ['ngRoute']);

require('./services')(teamApp);
require('./controllers')(teamApp);
require('./directives')(teamApp);

teamApp.config(['$routeProvider', function(routes) {
  routes
    })
    .when('/home', {
      //controller: 'Controller',
      templateUrl: '/views/main_view.html'
    })
    .otherwise({
      templateUrl: '/views/four_oh_four.html'
    });
}]);

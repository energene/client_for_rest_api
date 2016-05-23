var angular = require('angular');
require('angular-route');

var teamApp = angular.module('TeamApp', ['ngRoute']);

require('./services')(teamApp);
require('./controllers')(teamApp);
require('./directives')(teamApp);

teamApp.config(['$routeProvider', function(routes) {
  routes
    .when('/', {
      templateUrl: '/views/main_view.html'
    })
    .otherwise({
      templateUrl: '/views/four_oh_four.html'
    });
}]);

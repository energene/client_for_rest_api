module.exports = function(app) {
  app.directive('displayTeam', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/directives/team_display.html',
      scope: {
        teamData: '='
      }
    };
  });
};

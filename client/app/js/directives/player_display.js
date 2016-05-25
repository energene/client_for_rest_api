module.exports = function(app) {
  app.directive('displayPlayer', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/directives/player_display.html',
      scope: {
        playerData: '='
      }
    };
  });
};

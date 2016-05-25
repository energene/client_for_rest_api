module.exports = function(app){
  app.directive('playerForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/directives/player_form.html',
      scope: {
        buttonText: '@',
        newPlayer: '=',
        save: '&'
      }
    };
  });
};

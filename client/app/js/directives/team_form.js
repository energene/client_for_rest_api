module.exports = function(app){
  app.directive('teamForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/directives/team_form.html',
      scope: {
        buttonText: '@',
        newTeam: '=',
        save: '&'
      }
    };
  });
};

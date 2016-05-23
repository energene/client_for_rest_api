module.exports = function(app) {
  app.controller('TeamsController', ['$scope', '$http', 'Resource', function($scope, $http, Resource) {
    $scope.teams = [];
    var resource = Resource('teams');

    $scope.getAll = function() {
      resource.getAll(function(err, res){
        if (err) return console.log(err);
        $scope.teams = res;
      });
    };

    $scope.create = function(team) {
      $scope.teams.push(team);
      resource.create(team, function(err, res) {
        if (err) console.log(err);
        $scope.teams.splice($scope.teams.indexOf(team), 1, res);
        $scope.newTeam = null;
        $scope.getAll();
      });
    };

    $scope.update = function(team) {
      resource.update(team, function(err) {
        if (err) console.log(err);
        team.editing = false;
        $scope.getAll();
      });
    };

    $scope.remove = function(team) {
      resource.delete(team, function(err) {
        if (err) console.log(err);
        $scope.teams.splice($scope.teams.indexOf(team), 1);
        $scope.getAll();
      });
    };
  }]);
};

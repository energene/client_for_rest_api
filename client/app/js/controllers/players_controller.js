module.exports = function(app) {
  app.controller('PlayersController', ['$scope', '$http', 'Resource', function($scope, $http, Resource) {
    var resource = Resource('players');
    $scope.players = [];

    $scope.getAll = function() {
      resource.getAll(function(err, res){
        if (err) return console.log(err);
        $scope.players = res;
      });
    };

    $scope.create = function(player) {
      $scope.players.push(player);
      resource.create(player, function(err, res) {
        if (err) console.log(err);
        $scope.players.splice($scope.players.indexOf(player), 1, res);
        $scope.newPlayer = null;
        $scope.getAll();
      });
    };

    $scope.update = function(player) {
      resource.update(player, function(err) {
        if (err) console.log(err);
        player.editing = false;
        $scope.getAll();
      });
    };

    $scope.remove = function(player) {
      resource.delete(player, function(err) {
        if (err) console.log(err);
        $scope.players.splice($scope.players.indexOf(player), 1);
        $scope.getAll();
      });
    };
  }]);
};

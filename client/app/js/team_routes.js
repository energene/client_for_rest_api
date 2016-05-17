
module.exports = function(app) {
  app.controller('teamController', ['$scope', '$http', function($scope, $http) {
    this.teams = [];

      // $scope.backup = (team) => {
      //   team.backup = angular.copy(team);
      // };
      //
      // $scope.restoreBackup = (team) => {
      //   angular.copy(team.backup, team);
      // };
      //
      // $scope.deleteBackup = (team) => {
      //   delete team.backup;
      // };
      console.log("TESTteamroutes111");
      this.getAll = () => {
        $http.get( '/api/teams') //fetch the entire list
          .then((response) => {
            console.log(
              "TESTGETALLTEAMS222"
            )
            $scope.teams = response.data;
          }, handleErr.bind($scope));
      };
      //
      // $scope.createTeam = () => {
      //   $http.post(baseUrl + '/api/teams', $scope.newTeam)
      //     .then((response) => {

      //       $scope.teams.push(response.data);
      //       $scope.newTeam = null;
      //     }, handleErr.bind($scope));
      // };
      //
      // $scope.updateTeam = (team) => {
      //   $http.put(baseUrl + '/api/teams/' + team._id, team)
      //     .then(() => {
      //       team.editing = false;
      //     }, handleErr.bind($scope));
      // };
      //
      // $scope.removeTeam = (team) => {
      //   $http.delete(baseUrl + '/api/teams/' + team._id)
      //     .then(() => {
      //       $scope.teams.splice($scope.teams.indexOf(team), 1);
      //     }, handleErr.bind($scope));
      // };
  }]);
};

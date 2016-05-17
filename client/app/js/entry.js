const angular = require('angular');
//const slothbearApp = angular.module('slothbearApp', []);
// var handleErr = function(err) {
//   console.log(err);
//   this.errs = (this.errs || []).push(err);
// };

var teamApp = angular.module('TeamApp', []);

teamApp.controller('teamController', ['$scope','$http', function($scope, $http) {
  $scope.teams = [];

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
    console.log("TESTteamroutes444");
    $scope.getAll = () => {
      console.log("SCOPEGETALL");
      $http.get( 'http://localhost:3000/api/teams')
        .then((response) => {
          console.log(
            "TESTGETALLTEAMS"
          )
          $scope.teams = response.data;
        });
    };
    //
    // $scope.createTeam = () => {
    //   $http.post(baseUrl + '/api/teams', $scope.newTeam)
    //     .then((response) => {
    //       $scope.teams.push(response.data); //inserts into list
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

// console.log("IN ENTRY.js");
// require('./team_routes') (teamApp);

const angular = require('angular');

const teamApp = angular.module('teamApp', []);
const baseUrl = 'http://localhost:3000';

var handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

teamApp.controller('TeamsController', ['$http', function($http) {
  this.teams = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/teams')
    .then((res) => {
      this.teams = res.data;
    }, handleError.bind(this));
  };

  this.createTeam = () => {
    $http.post(baseUrl + '/api/teams', this.newTeam)
      .then((res) => {
        this.teams.push(res.data);
        this.newTeam = null;
      }, handleError.bind(this));
  };

  this.updateTeam = (team) => {
    $http.put(baseUrl + '/api/teams/' + team._id, team)
      .then(() => {
        team.editing = false;
      }, handleError.bind(this));
  };

  this.removeTeam = (team) => {
    $http.delete(baseUrl + '/api/teams/' + team._id)
    .then(() => {
      this.teams.splice(this.teams.indexOf(team), 1);
    }, handleError.bind(this));
  };
}]);

teamApp.controller('PlayersController', ['$http', function($http) {
  this.players = [];
  this.getAll = () => {
    $http.get(baseUrl + '/api/players')
    .then((res) => {
      this.players = res.data;
    }, handleError.bind(this));
  };

  this.createPlayer = () => {
    $http.post(baseUrl + '/api/players', this.newPlayer)
      .then((res) => {
        this.players.push(res.data);
        this.newPlayer = null;
      }, handleError.bind(this));
  };

  this.updatePlayer = (player) => {
    $http.put(baseUrl + '/api/players/' + player._id, player)
      .then(() => {
        player.editing = false;
      }, handleError.bind(this));
  };

  this.removePlayer = (player) => {
    $http.delete(baseUrl + '/api/players/' + player._id)
    .then(() => {
      this.players.splice(this.players.indexOf(player), 1);
    }, handleError.bind(this));
  };
}]);

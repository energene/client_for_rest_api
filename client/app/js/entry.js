const angular = require('angular');

const teamApp = angular.module('teamApp', []);
const baseUrl = 'http://localhost:3000';

var handleError = function(error) {
  console.log(error);
  this.errors = (this.errors || []).push(error);
};

var copy = function(object) {
  var temp = object.constructor();

  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      temp[key] = object[key];
    }
  }
  return temp;
};
teamApp.controller('TeamsController', ['$http', function($http) {
  this.teams = [];

  this.getAll = () => {
    $http.get(baseUrl + '/api/teams', this.newTeam)
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

  this.editTeam = (team) => {
      team.editing = true;
      this.backup = copy(team);
    };

  this.cancelTeam = (team) => {
    team.editing = false;
    for (var key in this.backup) {
      if (this.backup.hasOwnProperty(key)) {
        team[key] = this.backup[key];
      }
    }
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

  this.editPlayer = (player) => {
      player.editing = true;
      this.backup = copy(player);
    };

  this.cancelPlayer = (player) => {
    player.editing = false;
    for (var key in this.backup) {
      if (this.backup.hasOwnProperty(key)) {
      player[key] = this.backup[key];
      }
    }
  };

  this.removePlayer = (player) => {
    $http.delete(baseUrl + '/api/players/' + player._id)
    .then(() => {
      this.players.splice(this.players.indexOf(player), 1);
    }, handleError.bind(this));
  };
}]);

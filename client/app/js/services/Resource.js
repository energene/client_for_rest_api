'use strict';
var success = function(cb) {
  return function(res) {
    console.log(res);
    cb(null, res.data);
  };
};

var failure = function(cb) {
  return function(res) {
    console.log(res);
    cb(res);
  };
};

module.exports = exports = function(app) {
  app.factory('Resource', ['$http', '$window', function($http, $window) {
    var Resource = function(resource) {
      this.resource = resource;
    };
    var config = {
      headers:  {
        'token': $window.localStorage.token
      }
    };

    Resource.prototype.getAll = function(cb) {
      $http.get('http://localhost:3000/api/' + this.resource, config).then(success(cb), failure(cb));
    };

    Resource.prototype.create = function(data, cb) {
      $http.post('http://localhost:3000/api/' + this.resource, data, config).then(success(cb), failure(cb));
    };
    Resource.prototype.update = function(data, cb) {
      $http.put('http://localhost:3000/api/' + this.resource + '/' + data._id, data, config).then(success(cb), failure(cb));
    };
    Resource.prototype.delete = function(data, cb) {
      $http.delete('http://localhost:3000/api/' + this.resource + '/' + data._id, config).then(success(cb), failure(cb));
    };
    return function(resource) {
      return new Resource(resource);
    };
  }]);
};

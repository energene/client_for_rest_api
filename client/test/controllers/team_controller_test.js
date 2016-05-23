//use strict';
require(__dirname + '/../../app/js/entry');
var angular = require('angular');
require('angular-mocks');

describe('Teams Controller', function() {
 var $httpBackend;
 var $scope;
 var $ControllerConstructor;

 beforeEach(angular.mock.module('TeamApp'));
 beforeEach(angular.mock.inject(function($rootScope, $controller) {
   $ControllerConstructor = $controller;
   $scope = $rootScope.$new();
 }));

 it('Should be able to make a controller.', function() {
   var controller = $ControllerConstructor('TeamsController', { $scope });
   expect(typeof controller).toBe('object'); // eslint-disable-line
   expect(Array.isArray($scope.teams)).toBe(true); // eslint-disable-line
   expect(typeof $scope.getAll).toBe('function'); // eslint-disable-line
 });

 describe('REST requests', function() {

   beforeEach(angular.mock.inject(function(_$httpBackend_) {
     $httpBackend = _$httpBackend_;
     $ControllerConstructor('TeamsController', { $scope });
   }));

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

   it('Should make a GET request to "/api/teams".', function() {
     $httpBackend.expectGET('http://localhost:4000/api/teams').respond(200, [{ name: 'DaBears' }]);
     $scope.getAll();
     $httpBackend.flush();
     expect($scope.teams.length).toBe(1);
     expect($scope.teams[0].name).toBe('DaBears');
   });

   it('Should make a POST request to "/api/teams".', function() {
     var testTeam = { name: 'the response team' };
     $httpBackend.expectPOST('http://localhost:4000/api/teams', { name: 'the sent team' })
       .respond(200, testTeam);
     $httpBackend.expectGET('http://localhost:4000/api/teams').respond(200, [testTeam]);
     $scope.newTeam = { name: 'the new team' };
     $scope.create({ name: 'the sent team' });
     $httpBackend.flush();
     expect($scope.teams.length).toBe(1); // eslint-disable-line
     expect($scope.newTeam).toBe(null); // eslint-disable-line
     expect($scope.teams[0].name).toBe('the response team'); // eslint-disable-line
   });

   it('Should make an PUT request to "/api/teams/:id".', function() {
     var testTeam = { name: '49ers', _id: 6 };
     $scope.teams.push(testTeam);
     $httpBackend.expectPUT('http://localhost:4000/api/teams/6', testTeam).respond(200);
     $httpBackend.expectGET('http://localhost:4000/api/teams').respond(200, [testTeam]);
     $scope.update(testTeam);
     $httpBackend.flush();
     expect($scope.teams[0].name).toBe('49ers'); // eslint-disable-line
   });

   it('Should make a DELETE request to "/api/teams/:id".', () => {
     var testTeam = { name: 'Relocated Team', _id: 2 };
     $scope.teams.push(testTeam);
     expect($scope.teams.indexOf(testTeam)).not.toBe(-1); // eslint-disable-line
     $httpBackend.expectDELETE('http://localhost:4000/api/teams/2').respond(200);
     $httpBackend.expectGET('http://localhost:4000/api/teams').respond(200, [testTeam]);
     $scope.remove(testTeam);
     $httpBackend.flush();
     expect($scope.teams.indexOf(testTeam)).toBe(-1); // eslint-disable-line
   });
  });
});

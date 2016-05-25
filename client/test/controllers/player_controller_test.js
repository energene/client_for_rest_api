//use strict';
require(__dirname + '/../../app/js/entry');
var angular = require('angular');
require('angular-mocks');

describe('Players Controller', function() {
 var $httpBackend;
 var $scope;
 var $ControllerConstructor;

 beforeEach(angular.mock.module('TeamApp'));
 beforeEach(angular.mock.inject(function($rootScope, $controller) {
   $ControllerConstructor = $controller;
   $scope = $rootScope.$new();
 }));

 it('Should be able to make a controller.', function() {
   var controller = $ControllerConstructor('PlayersController', { $scope });
   expect(typeof controller).toBe('object'); // eslint-disable-line
   expect(Array.isArray($scope.players)).toBe(true); // eslint-disable-line
   expect(typeof $scope.getAll).toBe('function'); // eslint-disable-line
 });

 describe('REST requests', function() {

   beforeEach(angular.mock.inject(function(_$httpBackend_) {
     $httpBackend = _$httpBackend_;
     $ControllerConstructor('PlayersController', { $scope });
   }));

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

   it('Should make a GET request to "/api/players".', function() {
     $httpBackend.expectGET('http://localhost:4000/api/players').respond(200, [{ name: 'DaBears' }]);
     $scope.getAll();
     $httpBackend.flush();
     expect($scope.players.length).toBe(1); // eslint-disable-line
     expect($scope.players[0].name).toBe('DaBears'); // eslint-disable-line
   });

   it('Should make a POST request to "/api/players".', function() {
     var testPlayer = { name: 'the response player' };
     $httpBackend.expectPOST('http://localhost:4000/api/players', { name: 'the sent player' })
       .respond(200, testPlayer);
     $httpBackend.expectGET('http://localhost:4000/api/players').respond(200, [testPlayer]);
     $scope.newPlayer = { name: 'the new player' };
     $scope.create({ name: 'the sent player' });
     $httpBackend.flush();
     expect($scope.players.length).toBe(1); // eslint-disable-line
     expect($scope.newPlayer).toBe(null); // eslint-disable-line
     expect($scope.players[0].name).toBe('the response player'); // eslint-disable-line
   });

   it('Should make an PUT request to "/api/players/:id".', function() {
     var testPlayer = { name: '49ers', _id: 6 };
     $scope.players.push(testPlayer);
     $httpBackend.expectPUT('http://localhost:4000/api/players/6', testPlayer).respond(200);
     $httpBackend.expectGET('http://localhost:4000/api/players').respond(200, [testPlayer]);
     $scope.update(testPlayer);
     $httpBackend.flush();
     expect($scope.players[0].name).toBe('49ers'); // eslint-disable-line
   });

   it('Should make a DELETE request to "/api/players/:id".', () => {
     var testPlayer = { name: 'Relocated Player', _id: 2 };
     $scope.players.push(testPlayer);
     expect($scope.players.indexOf(testPlayer)).not.toBe(-1); // eslint-disable-line
     $httpBackend.expectDELETE('http://localhost:4000/api/players/2').respond(200);
     $httpBackend.expectGET('http://localhost:4000/api/players').respond(200, [testPlayer]);
     $scope.remove(testPlayer);
     $httpBackend.flush();
     expect($scope.players.indexOf(testPlayer)).toBe(-1); // eslint-disable-line
   });
  });
});

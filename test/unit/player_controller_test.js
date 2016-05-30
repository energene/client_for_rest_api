var angular = require('angular');
require('angular-mocks');

describe('The Player Controller', () => {
  var $controller;

  beforeEach(angular.mock.module('teamApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should actually in fact be a controller', () => {
    var playerCtrl = $controller('PlayerController');
    expect(typeof playerCtrl).toBe('object');
    expect(typeof playerCtrl.getAll).toBe('function');
  });

  describe('Controller REST functionality', () => {
    var $httpBackend;
    var playerCtrl;

    beforeEach(angular.mock.inject((_$httpBackend_) => {
      $httpBackend = _$httpBackend_;
      playerCtrl = $controller('PlayerController');
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to GET a player', () => {
      $httpBackend.expectGET('http://localhost:4000/api/player').respond(200,
        [{ name: 'test player' }]);
      playerCtrl.getAll();
      $httpBackend.flush();
      expect(playerCtrl.players.length).toBe(1);
      expect(playerCtrl.players[0].name).toBe('test player');
    });

    it('should be able to create a new Player', () => {
      $httpBackend.expectPOST('http://localhost:4000/api/player', { name: 'Betty'
    }).respond(200, { name: 'a different player entirely' });
      expect(playerCtrl.players.length).toBe(0);
      playerCtrl.newPlayer = { name: 'Betty' };
      playerCtrl.createPlayer();
      $httpBackend.flush();
      expect(playerCtrl.players[0].name).toBe('a different player entirely');
      expect(playerCtrl.newPlayer).toBe(null);
    });

    it('should be able to update a Player', () => {
      $httpBackend.expectPUT('http://localhost:4000/api/player/1', { name: 'updated Player',
      editing: true, _id: 1 } ).respond(200);
      playerCtrl.players = [{ name: 'ye olde playa', editing: true, _id: 1 }];
      playerCtrl.players[0].name = 'updated Player';
      playerCtrl.updatePlayer(playerCtrl.players[0]);
      $httpBackend.flush();
      expect(playerCtrl.players[0].editing).toBe(false);
    });

  });
});

var angular = require('angular');
require('angular-mocks');

describe('The Team Controller', () => {
  var $controller;

  beforeEach(angular.mock.module('teamApp'));

  beforeEach(angular.mock.inject((_$controller_) => {
    $controller = _$controller_;
  }));

  it('should actually in fact be a controller', () => {
    var teamCtrl = $controller('TeamController');
    expect(typeof teamCtrl).toBe('object');
    expect(typeof teamCtrl.getAll).toBe('function');
  });

  describe('Controller REST functionality', () => {
    var $httpBackend;
    var teamCtrl;

    beforeEach(angular.mock.inject((_$httpBackend_) => {
      $httpBackend = _$httpBackend_;
      teamCtrl = $controller('TeamController');
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to GET a team', () => {
      $httpBackend.expectGET('http://localhost:4000/api/team').respond(200,
        [{ name: 'test team' }]);
      teamCtrl.getAll();
      $httpBackend.flush();
      expect(teamCtrl.teams.length).toBe(1);
      expect(teamCtrl.teams[0].name).toBe('test team');
    });

    it('should be able to create a new Team', () => {
      $httpBackend.expectPOST('http://localhost:4000/api/team', { name: 'Cows'
    }).respond(200, { name: 'not Cows' });
      expect(teamCtrl.teams.length).toBe(0);
      teamCtrl.newTeam = { name: 'Cows' };
      teamCtrl.createTeam();
      $httpBackend.flush();
      expect(teamCtrl.teams[0].name).toBe('not Cows');
      expect(teamCtrl.newTeam).toBe(null);
    });

    it('should be able to update a Team', () => {
      $httpBackend.expectPUT('http://localhost:4000/api/team/1', { name: 'updated Team',
      editing: true, _id: 1 } ).respond(200);
      teamCtrl.teams = [{ name: 'ye olde team', editing: true, _id: 1 }];
      teamCtrl.teams[0].name = 'updated Team';
      teamCtrl.updateTeam(teamCtrl.teams[0]);
      $httpBackend.flush();
      expect(teamCtrl.teams[0].editing).toBe(false);
    });

  });
});

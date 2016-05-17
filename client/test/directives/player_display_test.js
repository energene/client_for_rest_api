var angular = require('angular');
var template = require('./../../app/templates/directives/player_display.html');
describe('player display directive', function() {
  var $compile;
  var $rootScope;
  var $httpBackend;
  beforeEach(angular.mock.module('TeamApp'));
  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

 it('should load the directive with an appropriate scope', function() {
   $httpBackend.expectGET('/templates/directives/player_display.html').respond(200, template);
   var scope = $rootScope.$new();
   scope.newPlayer = {name: 'inside scope name', height: 'inside scope height', weight: 'inside scope weight'};
   var element = $compile('<player-display data-player-data="newPlayer">shjsdghsghsohsoh</player-display>')(scope);
   $httpBackend.flush();
   $rootScope.$digest();
   expect(element.html()).toContain('inside scope name');
   expect(element.html()).toContain('inside scope height');
   expect(element.html()).toContain('inside scope weight');
   expect(element.html()).toContain('shjsdghsghsohsoh');
 });
 it('should load the directive with an appropriate object', function() {
   $httpBackend.when('GET', '/templates/directives/player_display.html').respond(200, template);
   var scope = $rootScope.$new();
   var element = $compile('<player-display data-player-data="{name: \'yogi\', height: \'66\', weight: \'222\'}">shjsdghsghsohsoh</player-display>')(scope);
   $httpBackend.flush();
   $rootScope.$digest();
   expect(element.html()).toContain('yogi');
   expect(element.html()).toContain('66');
   expect(element.html()).toContain('222');
   expect(element.html()).toContain('shjsdghsghsohsoh');
 });
});

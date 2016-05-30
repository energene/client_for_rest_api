describe('the Player End to End Tests', () => {
  it('should create a test Player', () => {
    browser.get('http://localhost:9999');
    element(by.model('playersctrl.newPlayer.name')).sendKeys('Bronko');
    element(by.model('playersctrl.newPlayer.position')).sendKeys('Fullback');
    element(by.model('playersctrl.newPlayer.team')).sendKeys('Bears');
    element(by.css('.create-player')).click();
    element(by.css('.playerList li:last-child p')).getText((text) => {
      expect(text).toEqual('Bronko plays Fullback for the Bears');
    });
  });

  it('should check for a list of players, and the last one was just created in the test', () => {
    browser.get('http://localhost:9999');
    element(by.css('.playerList li:last-child p')).getText().then((text) => {
      expect(text).toEqual('Bronko plays Fullback for the Bears');
    });
  });

  it('should not update from cancel button', () => {
    browser.get('http://localhost:9999');
    element(by.css('.playerList li:last-child .edit-player')).click();
    element(by.model('player.name')).clear().sendKeys('Betty');
    element(by.model('player.position')).clear().sendKeys('Rookie');
    element(by.model('player.team')).clear().sendKeys('Washington Wizards');
    element(by.css('.playerList li:last-child .cancel-player')).click();
    element(by.css('.playerList li:last-child p')).getText().then((text) => {
      expect(text).toEqual('Bronko plays Fullback for the Bears');
    });
  });

  it('should update the last player in the list', () => {
    browser.get('http://localhost:9999');
    element(by.css('.playerList li:last-child .edit-player')).click();
    element(by.model('player.name')).clear().sendKeys('Betty');
    element(by.model('player.position')).clear().sendKeys('Rookie');
    element(by.model('player.team')).clear().sendKeys('Washington Wizards');
    element(by.css('.playerList li:last-child .update-player')).click();
    element(by.css('.playerList li:last-child p')).getText().then((text) => {
      expect(text).toEqual('Betty plays Rookie for the Washington Wizards');
    });
  });

  it('should delete the last player', () => {
    browser.get('http://localhost:9999');
    var last = element(by.css('.playerList li:last-child p'));
    element(by.css('.playerList li:last-child .remove-player')).click();
    expect(last.isPresent()).toBeFalsy();
  });
});

describe('the Team End to End Tests', () => {
  it('should create a new test Team', () => {
    browser.get('http://localhost:9999');
    element(by.model('teamsctrl.newTeam.name')).sendKeys('Pink Panthers');
    element(by.model('teamsctrl.newTeam.city')).sendKeys('Puyallup');
    element(by.model('teamsctrl.newTeam.mascot')).sendKeys('Reddish Cat');
    element(by.css('.create-team')).click();
    element(by.css('.teamList li:last-child p')).getText((text) => {
      expect(text).toEqual('The Pink Panthers are in Puyallup and their mascot is a Reddish Cat');
    });
  });

  it('should check for a list of team, and the last one that was created in the test', () => {
    browser.get('http://localhost:9999');
    element(by.css('.teamList li:last-child p')).getText().then((text) => {
      expect(text).toEqual('The Pink Panthers are in Puyallup and their mascot is a Reddish Cat');
    });
  });

  it('should not update from the cancel button', () => {
    browser.get('http://localhost:9999');
    element(by.css('.teamList li:last-child .edit-team')).click();
    element(by.model('team.name')).clear().sendKeys('some new team');
    element(by.model('team.city')).clear().sendKeys('Fairbanks');
    element(by.model('team.mascot')).clear().sendKeys('Suffering');
    element(by.css('.teamList li:last-child .cancel-team')).click();
    element(by.css('.teamList li:last-child p')).getText().then((text) => {
      expect(text).toEqual('The Pink Panthers are in Puyallup and their mascot is a Reddish Cat');
    });
  });

  it('should update the last team in the list', () => {
    browser.get('http://localhost:9999');
    element(by.css('.teamList li:last-child .edit-team')).click();
    element(by.model('team.name')).clear().sendKeys('Doobie Brothers');
    element(by.model('team.city')).clear().sendKeys('San Francisco');
    element(by.model('team.mascot')).clear().sendKeys('Doobie');
    element(by.css('.teamList li:last-child .update-team')).click();
    element(by.css('.teamList li:last-child p')).getText().then((text) => {
      expect(text).toEqual('The Doobie Brothers are in San Francisco and their mascot is a Doobie');
    });
  });

  it('should delete the test team', () => {
    browser.get('http://localhost:9999');
    element(by.css('.teamList li:last-child .remove-team')).click();
    var last = element(by.css('.teamList li:last-child p'));
      expect(last.isPresent()).toBeFalsy();
  });
});

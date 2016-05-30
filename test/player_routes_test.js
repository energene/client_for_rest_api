const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 3000;
process.env.MONGODB_URI = 'mongodb://localhost/teamapp_test_db';
require(__dirname + '/../server/server.js');
const Player = require(__dirname + '/../server/models/player');

describe('The Player API POST function', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should add a player to the DB', (done) => {
    request('localhost:' + port)
    .post('/api/players')
    .send({
      name: 'Bronko Nagurski',
      position: 'Running Back',
      team: 'Da Bears'
    })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('Bronko Nagurski');
      expect(res.body.position).to.eql('Running Back');
      expect(res.body.team).to.eql('Da Bears');
      expect(res.body).to.have.property('_id');
      done();
    });
  });
});

describe('The Player API GET function', () => {
  it('should get all the players together', (done) => {
    request('localhost:' + port)
    .get('/api/players')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(Array.isArray(res.body)).to.eql(true);
      expect(res.body.length).to.eql(0);
      done();
    });
  });
});

describe('Requests that require a populated DB', () => {
  beforeEach((done) => {
    var newPlayer = new Player({
      name: 'Bronko Nagurski',
      position: 'Running Back',
      team: 'Da Bears'
    });
    newPlayer.save((err, data) => {
      if (err) console.log(err);
      this.player = data;
      done();
    });
  });
  afterEach((done) => {
    this.player.remove((err) => {
      if (err) console.log(err);
    done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should do good PUT', (done) => {
    request('localhost:' + port)
    .put('/api/players/' + this.player._id)
    .send({
      name: 'Betty Nagurski',
      position: 'Quarterback',
      team: 'Da Lions'
    })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('Betty Nagurski');
      done();
    });
  });

  it('should be able to cut a player', (done) => {
    request('localhost:' + port)
    .delete('/api/players/' + this.player._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });
});

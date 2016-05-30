const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const mongoose = require('mongoose');
const port = process.env.PORT = 4000;
process.env.MONGODB_URI = 'mongodb://localhost/teamapp_test_db';
require(__dirname + '/../server/server.js');
const Team = require(__dirname + '/../server/models/team');

describe('The Team Router POST function', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
  it('should be able to add a team to the DB', (done) => {
    request('localhost:' + port)
    .post('/api/teams')
    .send({
      name: 'Seahawks',
      city: 'Seattle',
      mascot: 'Big Bird'
    })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('Seahawks');
      expect(res.body.city).to.eql('Seattle');
      expect(res.body.mascot).to.eql('Big Bird');
      expect(res.body).to.have.property('_id');
      done();
    });
  });
});

describe('The Team Router GET function', () => {
  it('should get all the teams together', (done) => {
    request('localhost:' + port)
    .get('/api/teams')
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
    var newTeam = new Team({
      name: 'Seahawks',
      city: 'Seattle',
      mascot: 'Big Bird'
    });
    newTeam.save((err, data) => {
      if (err) console.log(err);
      this.team = data;
      done();
    });
  });
  afterEach((done) => {
    this.team.remove((err) => {
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
    .put('/api/teams/' + this.team._id)
    .send({
      name: 'Supersonics',
      city: 'West Seattle',
      mascot: 'Jumbo Jet'
    })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('Supersonics');
      done();
    });
  });

  it('should be able to delete a team', (done) => {
    request('localhost:' + port)
    .delete('/api/teams/' + this.team._id)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });
});

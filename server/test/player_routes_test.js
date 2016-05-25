const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const main = require(__dirname + '/test_server');
const request = chai.request;
const origin = 'localhost:4000/api';
const player = require(__dirname + '/../models/player');

describe('The player api', () => {
  var serverListen = null;

  before(() => {
    serverListen = main.server.listen(4000);
    main.db.connect(main.dbconnect);
  });
  after((done) => {
    main.db.connection.db.dropDatabase(() => {
      main.db.disconnect();
      serverListen.close();
      done();
    });
  });

  it('should be able to get all players', (done) => {
    chai.request(origin)
      .get('/players')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('should be able to create a new player with a valid age', (done) => {
    request(origin)
      .post('/players/')
      .send({name: 'Bronko Nagurski', age: 25, position: 'Running Back', height: 72, weight: 220})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('Bronko Nagurski');
        expect(res.body.age).to.eql(25);
        expect(res.body.position).to.eql('Running Back');
        expect(res.body.height).to.eql(72);
        expect(res.body.weight).to.eql(220);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('requests that require a populated DB', () => {

    beforeEach((done) => {
      player.create({name: 'test player'}, (err, data) => {
        this.testplayer = data;
        done();
      });
    });

    it('should be able to change a player', (done) => {
      request(origin)
        .put('/players/' + this.testplayer._id)
        .send({name: 'Richard Simmons', age: 33})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.name).to.eql('Richard Simmons');
          expect(res.body.age).to.eql(33);
          expect(res.body).to.have.property('_id');
          done();
        });
    });
    it('should be able to delete a player', (done) => {
      request(origin)
        .delete('/players/' + this.testplayer._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

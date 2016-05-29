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

  var newUserToken = null;
  before((done) => {
    var newUser = {
      email: 'newuser@gmail.com',
      username: 'newuser',
      password: '12345678'
    };
    chai.request(origin)
      .post('/signup')
      .send(newUser)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.a.status(200);
        expect(res.body.msg).to.eql('Signup was a huge success!');
        newUserToken = res.body.token;
        done();
      });
  });

  it('should be able to get all players', (done) => {
    chai.request(origin)
      .get('/players')
      .set('token', newUserToken)
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
      .set('token', newUserToken)
      .send({ name: 'Bronko Nagurski', age: 25, position: 'Running Back', height: 72, weight: 220 })
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
      player.create({ name: 'test player' }, (error, data) => {
        if (error) console.log(error);
        this.testplayer = data;
        done();
      });
    });

    it('should be able to change a player', (done) => {
      request(origin)
        .put('/players/' + this.testplayer._id)
        .set('token', newUserToken)
        .send({ name: 'Richard Simmons', age: 33 })
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
        .set('token', newUserToken)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const main = require(__dirname + '/test_server');
const request = chai.request;
const origin = 'localhost:4000/api';
const team = require(__dirname + '/../models/team');


describe('The team api', () => {
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

  it('should be able to get all teams', (done) => {
    request(origin)
      .get('/teams')
      .set('token', newUserToken)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('should be able to create a new team', (done) => {
    request(origin)
      .post('/teams/')
      .set('token', newUserToken)
      .send({ name: 'Bashers', city: 'Concussionville', mascot: 'Dinged Helmet', age: 99 })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('Bashers');
        expect(res.body.city).to.eql('Concussionville');
        expect(res.body.mascot).to.eql('Dinged Helmet');
        expect(res.body.age).to.eql(99);
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('requests that require a populated DB', () => {
    beforeEach((done) => {
      team.create({ name: 'test team' }, (err, data) => {
        if (err) console.log(err);
        this.testTeam = data;
        done();
      });
    });

    it('should be able to change a team', (done) => {
      request(origin)
        .put('/teams/' + this.testTeam._id)
        .set('token', newUserToken)
        .send({ name: 'Cavemen', city: 'Newark', age: 1 })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.name).to.eql('Cavemen');
          expect(res.body.city).to.eql('Newark');
          expect(res.body.age).to.eql(1);
          expect(res.body).to.have.property('_id');
          done();
        });
    });
    it('should be able to delete a team', (done) => {
      request(origin)
        .delete('/teams/' + this.testTeam._id)
        .set('token', newUserToken)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

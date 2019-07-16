"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _mocha = require("mocha");

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  should,
  expect
} = _chai.default;
should();

_chai.default.use(_chaiHttp.default);

const signupUrl = '/api/v1/auth/signup';
const signinUrl = '/api/v1/auth/signin';
(0, _mocha.describe)('Test API', () => {
  it('should return 200 for home page', done => {
    _chai.default.request(_app.default).get('/api/v1').end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Welcome To AutoMart MarketPlace');
      done();
    });
  });
  it('Should return not found for routes not specified', done => {
    _chai.default.request(_app.default).get('/another/undefined/route').end((err, res) => {
      expect(res.status).to.equal(404);
      done();
    });
  });
  it('Should Return 404 for Undefined Routes', done => {
    _chai.default.request(_app.default).post('/another/undefined/route').send({
      random: 'random'
    }).end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });
}); // Create users test

(0, _mocha.describe)('Test User Route', () => {
  (0, _mocha.describe)('POST/ Create Users', () => {
    it('should return 201 for successful register', done => {
      const userDetails = {
        id: 1,
        email: 'kehinde@automart.com',
        firstName: 'kehinde',
        lastName: 'alimi',
        password: 'xyzabc12',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        isAdmin: true
      };

      _chai.default.request(_app.default).post(signupUrl).send(userDetails).end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.status).to.equal(201);
        expect(res.body.data).to.be.a('object');
        expect(res.body.message).to.equal('Successfully created');
      });

      done();
    });
    it('should return 409 for existing Email', done => {
      const userDetails = {
        id: 1,
        email: 'kehinde@automart.com',
        firstName: 'kehinde',
        lastName: 'alimi',
        password: 'xyzabc12',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        isAdmin: true
      };

      _chai.default.request(_app.default).post(signupUrl).send(userDetails).end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.status).to.equal(409);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal('Conflict, Email already registered, proceed to sigin...');
      });

      done();
    });
    it('should return 400 for undefined email', done => {
      const userDetails = {
        firstName: 'kehinde',
        lastName: 'alimi',
        password: 'xyzabc12',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        isAdmin: true
      };

      _chai.default.request(_app.default).post(signupUrl).send(userDetails).end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
      });

      done();
    });
    it('should return 400 for undefined firstName', done => {
      const userDetails = {
        email: 'kehinde@automart.com',
        lastName: 'alimi',
        password: 'xyzabc12',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        isAdmin: true
      };

      _chai.default.request(_app.default).post(signupUrl).send(userDetails).end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
      });

      done();
    });
    it('should return 400 for lastName Undefined', done => {
      const userDetails = {
        email: 'kehinde@automart.com',
        firstName: 'kehinde',
        password: 'xyzabc12',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        isAdmin: true
      };

      _chai.default.request(_app.default).post(signupUrl).send(userDetails).end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
      });

      done();
    });
    it('should return 400 for empty password', done => {
      const userDetails = {
        id: 1,
        email: 'kehinde@automart.com',
        firstName: 'kehinde',
        lastName: 'alimi',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        isAdmin: true
      };

      _chai.default.request(_app.default).post(signupUrl).send(userDetails).end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
      });

      done();
    });
    it('should return 400 for undefined user address', done => {
      const userDetails = {
        email: 'kehinde@automart.com',
        firstName: 'kehinde',
        lastName: 'alimi',
        password: 'xyzabc12',
        isAdmin: true
      };

      _chai.default.request(_app.default).post(signupUrl).send(userDetails).end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
      });

      done();
    });
    it('should return 400 for invalid firstName character length', done => {
      const userDetails = {
        id: 1,
        email: 'kehinde@automart.com',
        firstName: 'ke',
        lastName: 'alimi',
        password: 'xyzabc12',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        isAdmin: true
      };

      _chai.default.request(_app.default).post(signupUrl).send(userDetails).end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
      });

      done();
    });
    it('should return 400 for invalid lastName character length', done => {
      const userDetails = {
        id: 1,
        email: 'kehinde@automart.com',
        firstName: 'kehinde',
        lastName: 'al',
        password: 'xyzabc12',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        isAdmin: true
      };

      _chai.default.request(_app.default).post(signupUrl).send(userDetails).end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
      });

      done();
    });
    it('should return 400 for invalid password character length', done => {
      const userDetails = {
        id: 1,
        email: 'kehinde@automart.com',
        firstName: 'kehinde',
        lastName: 'alimi',
        password: 'xyz12',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        isAdmin: true
      };

      _chai.default.request(_app.default).post(signupUrl).send(userDetails).end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
      });

      done();
    });
  });
}); // signin test

(0, _mocha.describe)('Test User Route', () => {
  (0, _mocha.describe)('POST/ Login Users', () => {
    it('should return 200 for successful Login', done => {
      const userLoginDetails = {
        email: 'alimi@automart.com',
        password: 'xyzabc12'
      };

      _chai.default.request(_app.default).post(signinUrl).send(userLoginDetails).end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.status).to.equal(200);
        expect(res.body.data).to.be.a('object');
        expect(res.body.message).to.equal('You signed in ...');
      });

      done();
    });
    it('should return 401 for incorrect password Login detail', done => {
      const userLoginDetails = {
        email: 'alimi@automart.com',
        password: 'xyzabc'
      };

      _chai.default.request(_app.default).post(signinUrl).send(userLoginDetails).end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.status).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal('Unauthorized, Input details does to match');
      });

      done();
    });
    it('should return 400 for undefined Login details', done => {
      const userLoginDetails = {
        email: '',
        password: ''
      };

      _chai.default.request(_app.default).post(signupUrl).send(userLoginDetails).end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
      });

      done();
    });
    it('should return 401 for incorect email Login detail', done => {
      const userLoginDetails = {
        email: 'ali##JJJ@automart.com',
        password: 'xyzabc12'
      };

      _chai.default.request(_app.default).post(signinUrl).send(userLoginDetails).end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.status).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal('Unauthorized, Cannot verify user details');
      });

      done();
    });
    it('should return 401 for incorect password and email details', done => {
      const userLoginDetails = {
        email: 'aliJJJ@automart.com',
        password: 'xyzabc12@@@@'
      };

      _chai.default.request(_app.default).post(signinUrl).send(userLoginDetails).end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.status).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal('Unauthorized, Cannot verify user details');
      });

      done();
    });
    it('should return 400 for undefined email Login detail', done => {
      const userLoginDetails = {
        password: 'xyzabc12'
      };

      _chai.default.request(_app.default).post(signupUrl).send(userLoginDetails).end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
      });

      done();
    });
    it('should return 400 for undefined Login password detail', done => {
      const userLoginDetails = {
        email: 'alimi@automart.com'
      };

      _chai.default.request(_app.default).post(signupUrl).send(userLoginDetails).end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
      });

      done();
    });
    it('should return 400 for invalid password character length Login detail', done => {
      const userLoginDetails = {
        email: 'alimi@automart.com',
        password: 'xyz'
      };

      _chai.default.request(_app.default).post(signupUrl).send(userLoginDetails).end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.a('object');
      });

      done();
    });
    it('should return 401 for incorrect email Login detail', done => {
      const userLoginDetails = {
        email: 'ali@automart.com',
        password: 'xyzabc12'
      };

      _chai.default.request(_app.default).post(signinUrl).send(userLoginDetails).end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.status).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal('Unauthorized, Cannot verify user details');
      });

      done();
    });
    it('should return 401 for incorrect email Login detail', done => {
      const userLoginDetails = {
        email: 'alimi@automart.com',
        password: 'xyzabc123h'
      };

      _chai.default.request(_app.default).post(signinUrl).send(userLoginDetails).end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.status).to.equal(401);
        expect(res.body).to.be.a('object');
        expect(res.body.error).to.equal('Unauthorized, Input details does to match');
      });

      done();
    });
  });
}); // end of user test
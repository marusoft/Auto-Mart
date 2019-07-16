/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import app from '../app';

const { should, expect } = chai;
should();

chai.use(chaiHttp);

const signupUrl = '/api/v1/auth/signup';
const signinUrl = '/api/v1/auth/signin';

describe('Test API', () => {
  it('should return 200 for home page', (done) => {
    chai.request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Welcome To AutoMart MarketPlace');
        done();
      });
  });
  it('Should return not found for routes not specified', (done) => {
    chai.request(app)
      .get('/another/undefined/route')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
  it('Should Return 404 for Undefined Routes', (done) => {
    chai.request(app)
      .post('/another/undefined/route')
      .send({ random: 'random' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
// Create users test
describe('Test User Route', () => {
  describe('POST/ Create Users', () => {
    it('should return 201 for successful register', (done) => {
      const userDetails = {
        user_id: 1,
        email: ' alimi@automart.com ',
        first_name: 'kehinde',
        last_name: 'alimi',
        password: 'passcode',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        is_admin: true,
      };
      chai.request(app)
        .post(signupUrl)
        .send(userDetails)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.status).to.equal(201);
          expect(res.body.data).to.be.a('object');
          expect(res.body.message).to.equal(`${req.body.first_name}, your account was successfully created`);
        });
      done();
    });

    it('should return 409 for existing Email', (done) => {
      const userDetails = {
        user_id: 1,
        email: ' alimi@automart.com ',
        first_name: 'kehinde',
        last_name: 'alimi',
        password: 'paascode',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        is_admin: true,
      };
      chai.request(app)
        .post(signupUrl)
        .send(userDetails)
        .end((err, res) => {
          expect(res).to.have.status(409);
          expect(res.status).to.equal(409);
          expect(res.body).to.be.a('object');
          expect(res.body.error).to.equal('Conflict, Email already registered, proceed to sigin...');
        });
      done();
    });

    it('should return 400 for undefined email', (done) => {
      const userDetails = {
        first_name: 'kehinde',
        last_name: 'alimi',
        password: 'passcode',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        is_admin: true,
      };
      chai.request(app)
        .post(signupUrl)
        .send(userDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('object');
        });
      done();
    });
    it('should return 400 for undefined firstName', (done) => {
      const userDetails = {
        email: 'alimi@automart.com',
        last_name: 'alimi',
        password: 'passcode',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        is_admin: true,
      };
      chai.request(app)
        .post(signupUrl)
        .send(userDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('object');
        });
      done();
    });
    it('should return 400 for lastName Undefined', (done) => {
      const userDetails = {
        email: 'alimi@automart.com',
        first_name: 'kehinde',
        password: 'passcode',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        is_admin: true,
      };
      chai.request(app)
        .post(signupUrl)
        .send(userDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('object');
        });
      done();
    });
    it('should return 400 for empty password', (done) => {
      const userDetails = {
        user_id: 1,
        email: 'alimi@automart.com',
        first_name: 'kehinde',
        last_name: 'alimi',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        is_admin: true,
      };
      chai.request(app)
        .post(signupUrl)
        .send(userDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('object');
        });
      done();
    });
    it('should return 400 for undefined user address', (done) => {
      const userDetails = {
        email: 'alimi@automart.com',
        first_name: 'kehinde',
        last_name: 'alimi',
        password: 'passcode',
        is_admin: true,
      };
      chai.request(app)
        .post(signupUrl)
        .send(userDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('object');
        });
      done();
    });
    it('should return 400 for invalid firstName character length', (done) => {
      const userDetails = {
        user_id: 1,
        email: 'alimi@automart.com',
        first_name: 'ke',
        last_name: 'alimi',
        password: 'passcode',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        is_admin: true,
      };
      chai.request(app)
        .post(signupUrl)
        .send(userDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('object');
        });
      done();
    });
    it('should return 400 for invalid lastName character length', (done) => {
      const userDetails = {
        user_id: 1,
        email: 'alimi@automart.com',
        first_name: 'kehinde',
        last_name: 'al',
        password: 'passcode',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        is_admin: true,
      };
      chai.request(app)
        .post(signupUrl)
        .send(userDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('object');
        });
      done();
    });
    it('should return 400 for invalid password character length', (done) => {
      const userDetails = {
        id: 1,
        email: 'alimi@automart.com',
        firstName: 'kehinde',
        lastName: 'alimi',
        password: 'pass12',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        is_admin: true,
      };
      chai.request(app)
        .post(signupUrl)
        .send(userDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('object');
        });
      done();
    });
  });
});
// signin test
describe('Test User Route', () => {
  describe('POST/ Login Users', () => {
    it('should return 200 for successful Login', (done) => {
      const userLoginDetails = {
        email: 'alimi@automart.com',
        password: 'passcode',
      };
      chai.request(app)
        .post(signinUrl)
        .send(userLoginDetails)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.status).to.equal(200);
          expect(res.body.data).to.be.a('object');
          expect(res.body.message).to.equal(`Welcome back ${rows[0].first_name}, your login was successful`);
        });
      done();
    });
    it('should return 401 for incorrect password Login detail', (done) => {
      const userLoginDetails = {
        email: 'alimi@automart.com',
        password: 'pass',
      };
      chai.request(app)
        .post(signinUrl)
        .send(userLoginDetails)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(res.body.error).to.equal('Unauthorized, Input details does to match');
        });
      done();
    });
    it('should return 400 for undefined Login details', (done) => {
      const userLoginDetails = {
        email: '',
        password: '',
      };
      chai.request(app)
        .post(signinUrl)
        .send(userLoginDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('object');
        });
      done();
    });
    it('should return 401 for incorect email Login detail', (done) => {
      const userLoginDetails = {
        email: 'ali##JJJ@automart.com',
        password: 'passcode',
      };
      chai.request(app)
        .post(signinUrl)
        .send(userLoginDetails)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(res.body.error).to.equal(`${req.body.email} does not exist, Please register an account or signup`);
        });
      done();
    });
    it('should return 401 for incorect password and email details', (done) => {
      const userLoginDetails = {
        email: 'aliJJJ@automart.com',
        password: 'xyzabc12@@@@',
      };
      chai.request(app)
        .post(signinUrl)
        .send(userLoginDetails)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(res.body.error).to.equal('Unauthorized, Cannot verify user details');
        });
      done();
    });
    it('should return 400 for undefined email Login detail', (done) => {
      const userLoginDetails = {
        password: 'passcode',
      };
      chai.request(app)
        .post(signinUrl)
        .send(userLoginDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('object');
        });
      done();
    });
    it('should return 400 for undefined Login password detail', (done) => {
      const userLoginDetails = {
        email: 'alimi@automart.com',
      };
      chai.request(app)
        .post(signinUrl)
        .send(userLoginDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('object');
        });
      done();
    });
    it('should return 400 for invalid password character length Login detail', (done) => {
      const userLoginDetails = {
        email: 'alimi@automart.com',
        password: 'pass',
      };
      chai.request(app)
        .post(signinUrl)
        .send(userLoginDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('object');
        });
      done();
    });
    it('should return 401 for incorrect email Login detail', (done) => {
      const userLoginDetails = {
        email: 'ali@automart.com',
        password: 'passcode',
      };
      chai.request(app)
        .post(signinUrl)
        .send(userLoginDetails)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.status).to.equal(401);
          expect(res.body).to.be.a('object');
          expect(res.body.error).to.equal(`${req.body.email} does not exist, Please register an account or signup`);
        });
      done();
    });
    it('should return 401 for incorrect password Login detail', (done) => {
      const userLoginDetails = {
        email: 'alimi@automart.com',
        password: 'passco123h',
      };
      chai.request(app)
        .post(signinUrl)
        .send(userLoginDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.error).to.equal('Password is incorrect');
        });
      done();
    });
  });
});
// end of user test

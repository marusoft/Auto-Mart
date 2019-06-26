import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import app from '../app';

const { should, expect } = chai;
should();

chai.use(chaiHttp);

const signupUrl = '/api/v1/auth/signup';
const signinUrl = '/api/v1/auth/signin';
// eslint-disable-next-line max-len
// const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJhYmR1bGxhaGJhYmExQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6Im1hcnVzb2Z0IiwibGFzdE5hbWUiOiJrZWhpbmRlb2xhIiwicGFzc3dvcmQiOiIkMmEkMTAkaWM3ZzIvak85WkNvNE1zTGdTaDBQLjZXNzAvVlpRSkI0YncuT1drZ1hpYWlWNHJQUmRpTk8iLCJhZGRyZXNzIjoiYW5kZWxhIGVwaWMgdG93ZXIiLCJpYXQiOjE1NjE0OTQ5MTR9.Yk3QHNrbYGocL75pPNl_UiIZHGJikMoG5pw6QF78bOI';

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
// Create users
describe('Test User Route', () => {
  describe('POST/ Create Users', () => {
    it('should return 201 for successful register', (done) => {
      const userDetails = {
        id: 1,
        email: 'kehinde@automart.com',
        firstName: 'kehinde',
        lastName: 'alimi',
        password: 'xyzabc12',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        isAdmin: true,
      };
      chai.request(app)
        .post(signupUrl)
        .send(userDetails)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.status).to.equal(201);
          expect(res.body.data).to.be.a('object');
          expect(res.body.message).to.equal('Successfully created');
        });
      done();
    });

    it('should return 409 for existing Email', (done) => {
      const userDetails = {
        id: 1,
        email: 'kehinde@automart.com',
        firstName: 'kehinde',
        lastName: 'alimi',
        password: 'xyzabc12',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        isAdmin: true,
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
        firstName: 'kehinde',
        lastName: 'alimi',
        password: 'xyzabc12',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        isAdmin: true,
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
        email: 'kehinde@automart.com',
        lastName: 'alimi',
        password: 'xyzabc12',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        isAdmin: true,
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
        email: 'kehinde@automart.com',
        firstName: 'kehinde',
        password: 'xyzabc12',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        isAdmin: true,
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
        id: 1,
        email: 'kehinde@automart.com',
        firstName: 'kehinde',
        lastName: 'alimi',
        address: '3, Olourunosebi street, Kekereowo, Lagos.',
        isAdmin: true,
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
    it('should return 201 for successful register', (done) => {
      const userDetails = {
        email: 'kehinde@automart.com',
        firstName: 'kehinde',
        lastName: 'alimi',
        password: 'xyzabc12',
        isAdmin: true,
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
        password: 'xyzabc12',
      };
      chai.request(app)
        .post(signinUrl)
        .send(userLoginDetails)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.status).to.equal(200);
          expect(res.body.data).to.be.a('object');
          expect(res.body.message).to.equal('You signed in ...');
        });
      done();
    });
    it('should return 401 for incorrect Login details', (done) => {
      const userLoginDetails = {
        email: 'alimi@automart.com',
        password: 'xyzabc',
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
        .post(signupUrl)
        .send(userLoginDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.a('object');
        });
      done();
    });
    it('should return 401 for undefined Login details', (done) => {
      const userLoginDetails = {
        email: 'ali##JJJ@automart.com',
        password: 'xyzabc12',
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
    // it('should return 401 for incorect password and email details', (done) => {
    //   const userLoginDetails = {
    //     email: 'ali##JJJ@automart.com',
    //     password: 'xyzabc12@@@@',
    //   };
    //   chai.request(app)
    //     .post(signinUrl)
    //     .send(userLoginDetails)
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       expect(res.status).to.equal(400);
    //       expect(res.body).to.be.a('object');
    //       expect(res.body.error).to.equal('Unauthorized, Cannot verify user details');
    //     });
    //   done();
    // });
  });
});
// end of user test

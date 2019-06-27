import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import app from '../app';

const { should, expect } = chai;
should();

chai.use(chaiHttp);
const defaultUrl = '/api/v1';
const signinUrl = '/api/v1/auth/signin';
let adminToken;
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtb3lvc29yZUBhdXRvbWFydC5jb20iLCJmaXJzdE5hbWUiOiJtb3lvc29yZSIsImxhc3ROYW1lIjoib21vZGFkYSIsInBhc3N3b3JkIjoib21vZGFkYTExIiwiYWRkcmVzcyI6IjMsIFRhbG9tby1vbGEgU3RyZWV0LCBhanVtb2Jpa29rYW50YWFudSwgTGFnb3MuIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2MTYyNzYzN30.j9jhfFpk8e24E85GIVZK1Y-4HQHJ_rE5-qofG6jiE5M';

// create token for an admin
describe('Login and create token for an admin', () => {
  describe('POST/ Login admin and create admin token', () => {
    it('it should signin an admin ', (done) => {
      const adminDetails = {
        email: 'alimi@automart.com',
        password: 'xyzabc12',
      };
      chai.request(app)
        .post(signinUrl)
        .send(adminDetails)
        .end((err, res) => {
          adminToken = res.body.data.token;
          done(err);
        });
    });
  });
});

// Car Test Case for admin user
describe('TEST CAR endpoint routes', () => {
  describe('GET /Car', () => {
    it('View all posted ads whether sold or available.', (done) => {
      chai
        .request(app)
        .get(`${defaultUrl}/car`)
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          done(err);
        });
    });
    it('should return error if no token is supplied.', (done) => {
      chai
        .request(app)
        .get(`${defaultUrl}/car`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('should return error if token provided is invalid.', (done) => {
      chai
        .request(app)
        .get(`${defaultUrl}/car`)
        .set('authorization', 'Bearer cbgdg56')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('should return error when unauthorized user tries to access endpoint.', (done) => {
      chai
        .request(app)
        .get(`${defaultUrl}/car`)
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('should return error if token is empty.', (done) => {
      chai
        .request(app)
        .get(`${defaultUrl}/car`)
        .set('authorization', '')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('should return error if token is invalid.', (done) => {
      chai
        .request(app)
        .get(`${defaultUrl}/car`)
        .set('authorization', `${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it('should delete specify car id.', (done) => {
      chai
        .request(app)
        .delete(`${defaultUrl}/car/2`)
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.status).to.equal(200);
          expect(res.body.data).to.equal('Car Ad successfully deleted');
          done(err);
        });
    });
    it('should delete specify car id.', (done) => {
      chai
        .request(app)
        .delete(`${defaultUrl}/car/2`)
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          done(err);
        });
    });
    it('should not delete specify car with an undefined id.', (done) => {
      chai
        .request(app)
        .delete(`${defaultUrl}/car/9999`)
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it(' it should display error if No authorization header was specified(auth)', (done) => {
      chai
        .request(app)
        .get(`${defaultUrl}/car`)
        .set('auth', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('No authorization header was specified');
          done(err);
        });
    });
    it(' it should display error if No authorization header was specified(token)', (done) => {
      chai
        .request(app)
        .get(`${defaultUrl}/car`)
        .set('token', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('error');
          // expect(res.body.error).to.equal('The provided token cannot be authenticated.');
          done(err);
        });
    });
    it(' it should display error if No authorization header was specified(error)', (done) => {
      chai
        .request(app)
        .get(`${defaultUrl}/car`)
        .set('error', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
    it(' it should display error if No authorization header was specified(payload)', (done) => {
      chai
        .request(app)
        .get(`${defaultUrl}/car`)
        .set('payload', `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res.body).to.have.property('error');
          done(err);
        });
    });
  });
});

// Test case for users
describe('TEST CAR endpoint routes ', () => {
  describe('POST /Car', () => {

  });
});

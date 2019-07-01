import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import app from '../app';

const { should, expect } = chai;
should();

chai.use(chaiHttp);

const defaultUrl = '/api/v1';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtb3lvc29yZUBhdXRvbWFydC5jb20iLCJmaXJzdE5hbWUiOiJtb3lvc29yZSIsImxhc3ROYW1lIjoib21vZGFkYSIsInBhc3N3b3JkIjoib21vZGFkYTExIiwiYWRkcmVzcyI6IjMsIFRhbG9tby1vbGEgU3RyZWV0LCBhanVtb2Jpa29rYW50YWFudSwgTGFnb3MuIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2MTYyNzYzN30.j9jhfFpk8e24E85GIVZK1Y-4HQHJ_rE5-qofG6jiE5M';

describe('FLAG/REPORT POST ROUTE TEST', () => {
  describe('POST /flag', () => {
    it('should return 201 for flag/report Successfully created', (done) => {
      const flagDetails = {
        carId: 3,
        reason: 'place of advert',
        description: 'Because of unstrusted place of advert',
      };
      chai.request(app)
        .post(`${defaultUrl}/flag`)
        .set('authorization', `Bearer ${userToken}`)
        .send(flagDetails)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.status).to.equal(201);
          expect(res.body.data).to.be.a('object');
          expect(res.body.message).to.equal('This AD is fraud');
        });
      done();
    });
    it('should return 404 if flag reason is undefined', (done) => {
      const flagDetails = {
        reason: '',
      };
      chai.request(app)
        .post(`${defaultUrl}/flag`)
        .set('authorization', `Bearer ${userToken}`)
        .send(flagDetails)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('Please specify the description for this AD');
        });
      done();
    });
    it('should return 404 if flag reason is not an alphabet characters', (done) => {
      const flagDetails = {
        reason: 'ustable price123',
      };
      chai.request(app)
        .post(`${defaultUrl}/flag`)
        .set('authorization', `Bearer ${userToken}`)
        .send(flagDetails)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.status).to.equal(406);
          expect(res.body.message).to.equal('Only Alphabets input are acceptable');
        });
      done();
    });
    it('should return 404 if flag description is undefined', (done) => {
      const flagDetails = {
        description: '',
      };
      chai.request(app)
        .post(`${defaultUrl}/flag`)
        .set('authorization', `Bearer ${userToken}`)
        .send(flagDetails)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('Please specify the reason for this AD');
        });
      done();
    });
    it('should return 404 if flag description is not an alphabet characters', (done) => {
      const flagDetails = {
        carId: 3,
        reason: 'place of advert',
        description: 'Because1 of unstrusted23 place of advert',
      };
      chai.request(app)
        .post(`${defaultUrl}/flag`)
        .set('authorization', `Bearer ${userToken}`)
        .send(flagDetails)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.status).to.equal(406);
          expect(res.body.message).to.equal('Only Alphabets input are acceptable');
        });
      done();
    });
  });
});

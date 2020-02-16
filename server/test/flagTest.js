import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import app from '../app';

const { should, expect } = chai;
should();

chai.use(chaiHttp);

const defaultUrl = '/api/v1';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtb3lvc29yZUBhdXRvbWFydC5jb20iLCJmaXJzdF9uYW1lIjoibW95b3NvcmUiLCJsYXN0X25hbWUiOiJvbW9kYWRhIiwicGFzc3dvcmQiOiIkMmEkMTAkVEJHQS44MEpyOHI3cGhJWGlMakNxZTdDRGVmSjIzMDBxckVuQ2llLkZFRzUzTXlQak5ZNm0iLCJhZGRyZXNzIjoiMyxUYWxvbW9vbGEgU3RyZWV0LCBhanVtb2JpLCBMYWdvcy4iLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU2MzYyOTc5NH0.sreGaT8-KpDtEu6VDjjJBQxKsJ9KiDNwWANtHHek11s';

describe('FLAG/REPORT POST ROUTE TEST', () => {
  describe('POST /flag', () => {
    it('should return 201 for flag/report Successfully created', (done) => {
      const flagDetails = {
        car_id: '3',
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
    it('should return 400 if flag reason is undefined', (done) => {
      const flagDetails = {
        car_id: '5',
        description: 'Because of unstrusted place of advert',
      };
      chai.request(app)
        .post(`${defaultUrl}/flag`)
        .set('authorization', `Bearer ${userToken}`)
        .send(flagDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Please specify the reason for this AD');
        });
      done();
    });
    // it('should return 400 if flag reason is not an alphabet characters', (done) => {
    //   const flagDetails = {
    //     car_id: 4,
    //     reason: '9991 888 8888',
    //     description: 'Because of unstrusted place of advert',
    //   };
    //   chai.request(app)
    //     .post(`${defaultUrl}/flag`)
    //     .set('authorization', `Bearer ${userToken}`)
    //     .send(flagDetails)
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       expect(res.status).to.equal(400);
    //       expect(res.body.message).to.equal('Only Alphabets input are acceptable');
    //     });
    //   done();
    // });
    it('should return 400 if flag description is undefined', (done) => {
      const flagDetails = {
        car_id: '3',
        reason: 'place of advert',
      };
      chai.request(app)
        .post(`${defaultUrl}/flag`)
        .set('authorization', `Bearer ${userToken}`)
        .send(flagDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Please specify the description for this AD');
        });
      done();
    });
    it('should return 400 if flag description is not an alphabet characters', (done) => {
      const flagDetails = {
        car_id: '2',
        reason: 'place of advert',
        description: 'Because1 2of unstrusted23 place of advert',
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

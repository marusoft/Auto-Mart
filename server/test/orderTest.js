import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import app from '../app';

const { should, expect } = chai;
should();

chai.use(chaiHttp);

const defaultUrl = '/api/v1';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtb3lvc29yZUBhdXRvbWFydC5jb20iLCJmaXJzdF9uYW1lIjoibW95b3NvcmUiLCJsYXN0X25hbWUiOiJvbW9kYWRhIiwicGFzc3dvcmQiOiIkMmEkMTAkVEJHQS44MEpyOHI3cGhJWGlMakNxZTdDRGVmSjIzMDBxckVuQ2llLkZFRzUzTXlQak5ZNm0iLCJhZGRyZXNzIjoiMyxUYWxvbW9vbGEgU3RyZWV0LCBhanVtb2JpLCBMYWdvcy4iLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU2MzcwNTU4OX0.MmdLkDr0k6Vga5u1iisQqxVvKBXR28cXh3nJ3fYsQUU';


describe('Create a purchase order,ORDER ROUTE TEST', () => {
  describe('POST /order', () => {
    it('should return 201 for new Purchase Order', (done) => {
      const carOrder = {
        car_id: '5',
        amount: '3500000',
      };
      chai.request(app)
        .post(`${defaultUrl}/order`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carOrder)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.status).to.equal(201);
          expect(res.body.data).to.be.a('object');
          expect(res.body).to.have.property('data');
        });
      done();
    });
    // it('should return 400 for unspecify amount for new Purchase Order', (done) => {
    //   const carOrder = {
    //     car_id: '5',
    //     amount: 'gbbbbbb',
    //   };
    //   chai.request(app)
    //     .post(`${defaultUrl}/order`)
    //     .set('authorization', `Bearer ${userToken}`)
    //     .send(carOrder)
    //     .end((err, res) => {
    //       expect(res).to.have.status(400);
    //       expect(res.body).to.be.a('object');
    //       expect(res.body).to.have.property('error');
    //       expect(res.body.error).to.equal('Please offer amount is required.');
    //     });
    //   done();
    // });
    it('should return 400 if price for not numbers', (done) => {
      const carOrder = {
        car_id: '3',
        amount: '3500000@#&',
      };
      chai.request(app)
        .post(`${defaultUrl}/order`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carOrder)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('amount offered should be numbers only');
        });
      done();
    });
  });
});

describe('Update the price of a purchase order, ORDER ROUTE TEST', () => {
  describe('POST /order', () => {
    // it('should update the price of Purchase Order', (done) => {
    //   const updatePurchaseOrder = {
    //     car_id: '3',
    //     price: '44000000',
    //   };
    //   chai.request(app)
    //     .patch(`${defaultUrl}/order/4/price`)
    //     .set('authorization', `Bearer ${userToken}`)
    //     .send(updatePurchaseOrder)
    //     .end((err, res) => {
    //       expect(res).to.have.status(200);
    //       expect(res.body.status).to.equal(200);
    //       expect(res.body).to.be.a('object');
    //       expect(res.body).to.have.property('data');
    //     });
    //   done();
    // });
    it('should not update the price of Purchase Order if car status is not pending', (done) => {
      const updatePurchaseOrder = {
        status: 'accepted',
        price: '3600000',
      };
      chai.request(app)
        .patch(`${defaultUrl}/order/3/price`)
        .set('authorization', `Bearer ${userToken}`)
        .send(updatePurchaseOrder)
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.status).to.equal(422);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Ooosh, Order is no longer pending');
        });
      done();
    });
  });
});

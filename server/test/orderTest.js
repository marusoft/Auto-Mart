import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import app from '../app';

const { should, expect } = chai;
should();

chai.use(chaiHttp);

const defaultUrl = '/api/v1';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJtb3lvc29yZUBhdXRvbWFydC5jb20iLCJmaXJzdE5hbWUiOiJtb3lvc29yZSIsImxhc3ROYW1lIjoib21vZGFkYSIsInBhc3N3b3JkIjoib21vZGFkYTExIiwiYWRkcmVzcyI6IjMsIFRhbG9tby1vbGEgU3RyZWV0LCBhanVtb2Jpa29rYW50YWFudSwgTGFnb3MuIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU2MTYyNzYzN30.j9jhfFpk8e24E85GIVZK1Y-4HQHJ_rE5-qofG6jiE5M';

describe('Create a purchase order,ORDER ROUTE TEST', () => {
  describe('POST /order', () => {
    it('should return 201 for new Purchase Order', (done) => {
      const carOrder = {

        priceOffered: '3500000',
        carId: '3',


      };
      chai.request(app)
        .post(`${defaultUrl}/order`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carOrder)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.status).to.equal(201);
          // expect(res.body.data).to.be.a('object');
          expect(res.body).to.have.property('data');
        });
      done();
    });
    it('should return 404 for unspecify price for new Purchase Order', (done) => {
      const carOrder = {

        priceOffered: '',
        carId: '3',

      };
      chai.request(app)
        .post(`${defaultUrl}/order`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carOrder)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Please offer price is required');
        });
      done();
    });
    it('should return 404 if price for not numbers', (done) => {
      const carOrder = {

        priceOffered: '3500000@#&',
        carId: '3',

      };
      chai.request(app)
        .post(`${defaultUrl}/order`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carOrder)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('price offered should be numbers only');
        });
      done();
    });
  });
});

describe('Update the price of a purchase order, ORDER ROUTE TEST', () => {
  describe('POST /order', () => {
    it('should update the price of Purchase Order', (done) => {
      const updatePurchaseOrder = {
        status: 'pending',
        newPurchasePrice: '440000',
        email: 'moyosore@automart.com',
      };
      chai.request(app)
        .patch(`${defaultUrl}/order/4/price`)
        .set('authorization', `Bearer ${userToken}`)
        .send(updatePurchaseOrder)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.status).to.equal(200);
          // expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('data');
        });
      done();
    });
    it('should not update the price of Purchase Order if car status is not pending', (done) => {
      const updatePurchaseOrder = {
        status: 'accepted',
        newPurchasePrice: '440000',
        // email: 'moyosore@automart.com',
      };
      chai.request(app)
        .patch(`${defaultUrl}/order/5/price`)
        .set('authorization', `Bearer ${userToken}`)
        .send(updatePurchaseOrder)
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.status).to.equal(422);
          // expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Ooosh, Order is no longer pending');
        });
      done();
    });
  });
});

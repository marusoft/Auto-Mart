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
    describe('ADMIN DELETE Car Route', () => {
      describe('ADMIN DELETE Car', () => {
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
    it('should return 201 for new Car Advert Successfully created', (done) => {
      const carDetails = {
        state: 'new',
        status: 'available',
        price: '3500000',
        manufacturer: 'Mitsubishi',
        model: 'SUV',
        bodyType: 'Car',
        carImageUrl: 'http://some-car-imag.com/mitsubishi.png',
      };
      chai.request(app)
        .post(`${defaultUrl}/car`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carDetails)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.status).to.equal(201);
          expect(res.body.data).to.be.a('object');
          expect(res.body.message).to.equal('Car Advert Successfully created');
        });
      done();
    });
    it('should return 201 for used Car Advert Successfully created', (done) => {
      const carDetails = {
        state: 'used',
        status: 'available',
        price: '3500000',
        manufacturer: 'Mitsubishi',
        model: 'SUV',
        bodyType: 'Car',
        carImageUrl: 'http://some-car-imag.com/mitsubishi.png',
      };
      chai.request(app)
        .post(`${defaultUrl}/car`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carDetails)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.status).to.equal(201);
          expect(res.body.data).to.be.a('object');
          expect(res.body.message).to.equal('Car Advert Successfully created');
        });
      done();
    });
    it('should return 401 for invalid user token', (done) => {
      const carDetails = {
        state: 'new',
        status: 'available',
        price: '3500000',
        manufacturer: 'Mitsubishi',
        model: 'SUV',
        bodyType: 'Car',
        carImageUrl: 'http://some-car-imag.com/mitsubishi.png',
      };
      chai.request(app)
        .post(`${defaultUrl}/car`)
        .set('authorization', `${userToken}`)
        .send(carDetails)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('The provided token cannot be authenticated.');
        });
      done();
    });
    it('should return error if token is empty.', (done) => {
      const carDetails = {
        state: 'new',
        status: 'available',
        price: '3500000',
        manufacturer: 'Mitsubishi',
        model: 'SUV',
        bodyType: 'Car',
        carImageUrl: 'http://some-car-imag.com/mitsubishi.png',
      };
      chai.request(app)
        .post(`${defaultUrl}/car`)
        .set('authorization', '')
        .send(carDetails)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('error');
        });
      done();
    });
    it('should return error if state is not new or used.', (done) => {
      const carDetails = {
        state: 'nnnrt45',
        status: 'available',
        price: '3500000',
        manufacturer: 'Mitsubishi',
        model: 'SUV',
        bodyType: 'Car',
        carImageUrl: 'http://some-car-imag.com/mitsubishi.png',
      };
      chai.request(app)
        .post(`${defaultUrl}/car`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Car state can either be new or used.');
        });
      done();
    });
    // it('should return error if state is undefined.', (done) => {
    //   const carDetails = {
    //     status: 'available',
    //     price: '3500000',
    //     manufacturer: 'Mitsubishi',
    //     model: 'SUV',
    //     bodyType: 'Car',
    //     carImageUrl: 'http://some-car-imag.com/mitsubishi.png',
    //   };
    //   chai.request(app)
    //     .post(`${defaultUrl}/car`)
    //     .set('authorization', `Bearer ${userToken}`)
    //     .send(carDetails)
    //     .end((err, res) => {
    //       expect(res).to.have.status(404);
    //       expect(res.status).to.equal(404);
    //       expect(res.body).to.be.a('object');
    //       expect(res.body.message).to.equal('please specify the state of the car.');
    //     });
    //   done();
    // });
    it('should return error if status is undefined.', (done) => {
      const carDetails = {
        state: 'new',
        status: 'favailablevdf',
        price: '3500000',
        manufacturer: 'Mitsubishi',
        model: 'SUV',
        bodyType: 'Car',
        carImageUrl: 'http://some-car-imag.com/mitsubishi.png',
      };
      chai.request(app)
        .post(`${defaultUrl}/car`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carDetails)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.status).to.equal(400);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Car status can either be available or sold');
        });
      done();
    });
    // it('should return error if status is undefined.', (done) => {
    //   const carDetails = {
    //     state: 'new',
    //     price: '3500000',
    //     manufacturer: 'Mitsubishi',
    //     model: 'SUV',
    //     bodyType: 'Car',
    //     carImageUrl: 'http://some-car-imag.com/mitsubishi.png',
    //   };
    //   chai.request(app)
    //     .post(`${defaultUrl}/car`)
    //     .set('authorization', `Bearer ${userToken}`)
    //     .send(carDetails)
    //     .end((err, res) => {
    //       expect(res).to.have.status(404);
    //       expect(res.status).to.equal(404);
    //       expect(res.body).to.be.a('object');
    //       expect(res.body.message).to.equal('please specify the status of the car.');
    //     });
    //   done();
    // });
    it('should return error if price is undefined.', (done) => {
      const carDetails = {
        state: 'new',
        status: 'available',
        manufacturer: 'Mitsubishi',
        model: 'SUV',
        bodyType: 'Car',
        carImageUrl: 'http://some-car-imag.com/mitsubishi.png',
      };
      chai.request(app)
        .post(`${defaultUrl}/car`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carDetails)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.status).to.equal(406);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Please specify car price.');
        });
      done();
    });
    it('should return error if price is not number.', (done) => {
      const carDetails = {
        state: 'new',
        status: 'available',
        price: 'rrrrrrr',
        manufacturer: 'Mitsubishi',
        model: 'SUV',
        bodyType: 'Car',
        carImageUrl: 'http://some-car-imag.com/mitsubishi.png',
      };
      chai.request(app)
        .post(`${defaultUrl}/car`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carDetails)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.status).to.equal(406);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Only numbers are acceptable as Price.');
        });
      done();
    });
    it('should return error if manufacturer is not defined.', (done) => {
      const carDetails = {
        state: 'new',
        status: 'available',
        price: '3500000',
        model: 'SUV',
        bodyType: 'Car',
        carImageUrl: 'http://some-car-imag.com/mitsubishi.png',
      };
      chai.request(app)
        .post(`${defaultUrl}/car`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carDetails)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('please specify the manufacturer of the car.');
        });
      done();
    });
    it('should return error if manufacturer is not alphabets characters.', (done) => {
      const carDetails = {
        state: 'new',
        status: 'available',
        price: '3500000',
        manufacturer: 'Mitsubishi345',
        model: 'SUV',
        bodyType: 'Car',
        carImageUrl: 'http://some-car-imag.com/mitsubishi.png',
      };
      chai.request(app)
        .post(`${defaultUrl}/car`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carDetails)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.status).to.equal(406);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Only Alphabets input are acceptable.');
        });
      done();
    });
    it('should return error if model is not defined', (done) => {
      const carDetails = {
        state: 'new',
        status: 'available',
        price: '3500000',
        manufacturer: 'Mitsubishi',
        bodyType: 'Car',
        carImageUrl: 'http://some-car-imag.com/mitsubishi.png',
      };
      chai.request(app)
        .post(`${defaultUrl}/car`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carDetails)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('please specify the Vehicle model.');
        });
      done();
    });
    it('should return error if model is not alphabets characters.', (done) => {
      const carDetails = {
        state: 'new',
        status: 'available',
        price: '3500000',
        manufacturer: 'Mitsubishi',
        model: 'SUV1233',
        bodyType: 'Car',
        carImageUrl: 'http://some-car-imag.com/mitsubishi.png',
      };
      chai.request(app)
        .post(`${defaultUrl}/car`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carDetails)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.status).to.equal(406);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Only Alphabets input are acceptable.');
        });
      done();
    });
    it('should return error if bodyType is not defined', (done) => {
      const carDetails = {
        state: 'new',
        status: 'available',
        price: '3500000',
        manufacturer: 'Mitsubishi',
        model: 'SUV',
        carImageUrl: 'http://some-car-imag.com/mitsubishi.png',
      };
      chai.request(app)
        .post(`${defaultUrl}/car`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carDetails)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('please specify the bodyType of the car.');
        });
      done();
    });
    it('should return error if model is not alphabets characters.', (done) => {
      const carDetails = {
        state: 'new',
        status: 'available',
        price: '3500000',
        manufacturer: 'Mitsubishi',
        model: 'SUV',
        bodyType: 'Car457',
        carImageUrl: 'http://some-car-imag.com/mitsubishi.png',
      };
      chai.request(app)
        .post(`${defaultUrl}/car`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carDetails)
        .end((err, res) => {
          expect(res).to.have.status(406);
          expect(res.status).to.equal(406);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Only Alphabets input are acceptable.');
        });
      done();
    });
    it('should return error if car image url is not found', (done) => {
      const carDetails = {
        state: 'new',
        status: 'available',
        price: '3500000',
        manufacturer: 'Mitsubishi',
        model: 'SUV',
        bodyType: 'Car',
      };
      chai.request(app)
        .post(`${defaultUrl}/car`)
        .set('authorization', `Bearer ${userToken}`)
        .send(carDetails)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.status).to.equal(404);
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Please upload an image for this vehicle.');
        });
      done();
    });
    it('should view specify car id.', (done) => {
      chai
        .request(app)
        .get(`${defaultUrl}/car/3`)
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body.message).to.equal('Specify car seen.');
        });
      done();
    });
    it('should not view specify car with an invalid id.', (done) => {
      chai
        .request(app)
        .get(`${defaultUrl}/car/9999`)
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Cannot find the specify car');
        });
      done();
    });
  });
});
// update car route
describe('TEST  for CAR Update endpoint routes ', () => {
  describe('PATCH api/v1/Car/:id/status', () => {
    it('should not update car status with an invalid id.', (done) => {
      chai
        .request(app)
        .patch(`${defaultUrl}/car/9999/status`)
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Invalid car id');
        });
      done();
    });
    it('should not update car that is already sold.', (done) => {
      chai
        .request(app)
        .patch(`${defaultUrl}/car/1/status`)
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res).to.have.status(302);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Car is already mark as Sold');
        });
      done();
    });
  });
});

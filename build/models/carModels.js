"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const cars = [{
  id: 1,
  owner: 1,
  // user id
  createdOn: new Date(),
  state: 'new',
  status: 'available',
  price: '3500000',
  manufacturer: 'Mitsubishi',
  model: 'SUV',
  bodyType: 'Car',
  carImageUrl: 'http://some-car-imag.com/mitsubishi.png'
}, {
  id: 2,
  owner: 2,
  createdOn: new Date(),
  state: 'used',
  status: 'sold',
  price: '1500000',
  manufacturer: 'Mack',
  model: 'Diecast',
  bodyType: 'Trailer',
  carImageUrl: 'http://some-car-imag.com/mack.jpeg'
}, {
  id: 3,
  owner: 3,
  createdOn: new Date(),
  state: 'new',
  status: 'sold',
  price: '2500000',
  manufacturer: 'Volkswagen',
  model: 'PickUp',
  bodyType: 'Truck',
  carImageUrl: 'http://some-car-imag.com/volkswagen.jpg'
}, {
  id: 4,
  owner: 4,
  createdOn: new Date(),
  state: 'used',
  status: 'available',
  price: '4500000',
  manufacturer: 'Toyota',
  model: 'Sienna',
  bodyType: 'Van',
  carImageUrl: 'http://some-car-imag.com/toyota.png'
}, {
  id: 5,
  owner: 2,
  createdOn: new Date(),
  state: 'used',
  status: 'sold',
  price: '5500000',
  manufacturer: 'Peugeot',
  model: 'PickUp',
  bodyType: 'Truck',
  carImageUrl: 'http://some-car-imag.com/peugeot.jpeg'
}, {
  id: 6,
  owner: 6,
  createdOn: new Date(),
  state: 'new',
  status: 'sold',
  price: '6500000',
  manufacturer: 'Peugeot',
  model: 'PickUp',
  bodyType: 'Truck',
  carImageUrl: 'http://some-car-imag.com/peugeot.jpeg'
}, {
  id: 7,
  owner: 2,
  createdOn: new Date(),
  state: 'new',
  status: 'available',
  price: '7500000',
  manufacturer: 'Mercedes Benz',
  model: 'PickUp',
  bodyType: 'Van',
  carImageUrl: 'http://some-car-imag.com/Mercedes-benz.jpeg'
}, {
  id: 8,
  owner: 2,
  createdOn: new Date(),
  state: 'used',
  status: 'available',
  price: '3400000',
  manufacturer: 'Honda',
  model: 'SUV',
  bodyType: 'Car',
  carImageUrl: 'http://some-car-imag.com/honda.jpeg'
}, {
  id: 9,
  owner: 2,
  createdOn: new Date(),
  state: 'used',
  status: 'sold',
  price: '1500000',
  manufacturer: 'Mack',
  model: 'Diecast',
  bodyType: 'Trailer',
  carImageUrl: 'http://some-car-imag.com/mack.jpeg'
}];
var _default = cars;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _carControllers = _interopRequireDefault(require("../controllers/carControllers"));

var _carsValidation = _interopRequireDefault(require("../middlewares/carsValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { isCarOwner, isAdminUser } from '../ownerAdminAuth.js';
var carRouter = _express["default"].Router();

carRouter.post('/car', _carsValidation["default"].validateCarsDetails, _carControllers["default"].createCarSaleAD);
carRouter.get('/car/:id', _carsValidation["default"].validateSpecifyCar, _carControllers["default"].ViewASpecificCar);
carRouter["delete"]('/car/:id', _carsValidation["default"].validateSpecifyCar, _carControllers["default"].deleteASpecificCarAD);
carRouter.patch('/car/:id/status', _carControllers["default"].updateCarStatus);
carRouter.patch('/car/:id/price', _carControllers["default"].updateCarPrice);
carRouter.get('/car', _carControllers["default"].ViewAllPostedADCar);
var _default = carRouter;
exports["default"] = _default;
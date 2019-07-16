"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _carControllers = _interopRequireDefault(require("../controllers/carControllers"));

var _carsValidation = _interopRequireDefault(require("../middlewares/carsValidation"));

var _authUser = _interopRequireDefault(require("../middlewares/authUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carRouter = _express.default.Router();

carRouter.post('/car', _authUser.default.verifyUser, _carsValidation.default.validateCarsDetails, _carControllers.default.createCarSaleAD);
carRouter.get('/car/:id', _authUser.default.verifyUser, _carsValidation.default.validateSpecifyCar, _carControllers.default.ViewASpecificCar);
carRouter.delete('/car/:id', _authUser.default.verifyAdmin, _carsValidation.default.validateSpecifyCar, _carControllers.default.adminDeleteASpecificCarAD);
carRouter.patch('/car/:id/status', _authUser.default.verifyUser, _authUser.default.isOwner, _carControllers.default.updateCarStatus);
carRouter.patch('/car/:id/price', _authUser.default.verifyUser, _authUser.default.isOwner, _carControllers.default.updateCarPrice);
carRouter.get('/car', _carControllers.default.ViewAllUnsoldCarsPriceRange, _carControllers.default.ViewAllUnsoldCars, _authUser.default.verifyAdmin, _carControllers.default.AdminViewAllPostedADCar);
var _default = carRouter;
exports.default = _default;
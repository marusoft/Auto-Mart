"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdminUser = exports.isCarOwner = void 0;

var _carModels = _interopRequireDefault(require("./models/carModels"));

var _usersModels = _interopRequireDefault(require("./models/usersModels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isCarOwner = function isCarOwner(req, res, next) {
  var owner = req.body;

  var verifyOwner = _usersModels["default"].find(function (user) {
    return owner === user.firstName && user.lastName;
  });

  if (!verifyOwner) {
    return res.status(401).json({
      success: 401,
      message: 'You need to create an account'
    });
  }

  return next();
};

exports.isCarOwner = isCarOwner;

var isAdminUser = function isAdminUser(req, res, next) {
  var id = Number(req.params.id);

  var findCarId = _carModels["default"].find(function (car) {
    return car.id === id;
  });

  var isAdmin = false;

  if (!isAdmin && findCarId) {
    var findSpecificCar = req.body.findSpecificCar;

    _carModels["default"].splice(findSpecificCar, 1);

    return res.status(200).json({
      status: 200,
      data: 'Car Ad successfully deleted'
    });
  }

  return next();
};

exports.isAdminUser = isAdminUser;
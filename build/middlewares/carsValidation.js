"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _carModels = _interopRequireDefault(require("../models/carModels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Car Validation
 * @class CarsValidation
 */
var CarsValidation =
/*#__PURE__*/
function () {
  function CarsValidation() {
    _classCallCheck(this, CarsValidation);
  }

  _createClass(CarsValidation, null, [{
    key: "validateCarsDetails",

    /**
       * @returns {object} validateCarsDetails
       * @param {*} req
       * @param {*} res
       * @param {*} next
       */
    value: function validateCarsDetails(req, res, next) {
      var _req$body = req.body,
          _req$body$state = _req$body.state,
          state = _req$body$state === void 0 ? 'new' : _req$body$state,
          _req$body$status = _req$body.status,
          status = _req$body$status === void 0 ? 'available' : _req$body$status,
          price = _req$body.price,
          manufacturer = _req$body.manufacturer,
          model = _req$body.model,
          bodyType = _req$body.bodyType,
          carImageUrl = _req$body.carImageUrl;

      if (state === undefined) {
        return res.status(404).json({
          message: 'please specify the state of the car'
        });
      }

      if (state) {
        state = state.trim();

        if (state.toLowerCase() !== 'new' && state.toLowerCase() !== 'used') {
          return res.status(400).json({
            message: 'Car state can either be new or used'
          });
        }
      }

      if (status === undefined) {
        return res.status(404).json({
          message: 'please specify the status of the car'
        });
      }

      if (status) {
        status = status.trim();

        if (status.toLowerCase() !== 'available' && status.toLowerCase() !== 'sold') {
          return res.status(400).json({
            message: 'Car status can either be available or sold'
          });
        }
      }

      if (price === undefined) {
        return res.status(406).json({
          message: 'Please specify car price'
        });
      }

      if (price) {
        price = price.trim();

        if (!/^\d+$/.test(price)) {
          return res.status(406).json({
            message: 'Only numbers are acceptable as Price'
          });
        }
      }

      if (manufacturer === undefined) {
        return res.status(404).json({
          message: 'please specify the manufacturer of the car'
        });
      }

      if (manufacturer) {
        manufacturer = manufacturer.trim();

        if (/[^a-zA-Z]/.test(manufacturer)) {
          return res.status(406).json({
            message: 'Only Alphabets input are acceptable'
          });
        }
      }

      if (model === undefined) {
        return res.status(404).json({
          message: 'please specify the Vehicle model'
        });
      }

      if (model) {
        model = model.trim();

        if (/[^a-zA-Z]/.test(model)) {
          return res.status(406).json({
            message: 'Only Alphabets input are acceptable'
          });
        }
      }

      if (bodyType === undefined) {
        return res.status(404).json({
          message: 'please specify the bodyType of the car'
        });
      }

      if (bodyType) {
        bodyType = bodyType.trim();

        if (/[^a-zA-Z]/.test(bodyType)) {
          return res.status(406).json({
            message: 'Only Alphabets input are acceptable'
          });
        }
      }

      if (carImageUrl === undefined) {
        return res.status(404).json({
          message: 'Please upload an image for this vehicle'
        });
      }

      req.body.state = state.toLowerCase().trim();
      req.body.status = status.toLowerCase().trim();
      req.body.price = price;
      req.body.manufacturer = manufacturer.toLowerCase();
      req.body.model = model.toLowerCase();
      req.body.bodyType = bodyType.toLowerCase();
      return next();
    }
    /**  View a specific car.
     * @static
     * @returns {object} validateSpecifyCar
     * @params {object} req
     * @params {object} res
     */

  }, {
    key: "validateSpecifyCar",
    value: function validateSpecifyCar(req, res, next) {
      var id = req.params.id;

      var findSpecificCar = _carModels["default"].find(function (car) {
        return car.id === parseInt(id, 10);
      });

      if (!findSpecificCar) {
        return res.status(404).json({
          status: 404,
          error: 'Cannot find the specify car'
        });
      }

      req.body.findSpecificCar = findSpecificCar;
      return next();
    }
  }]);

  return CarsValidation;
}();

var _default = CarsValidation;
exports["default"] = _default;
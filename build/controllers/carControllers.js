"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _carModels = _interopRequireDefault(require("../models/carModels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class Cars
 */
var Cars =
/*#__PURE__*/
function () {
  function Cars() {
    _classCallCheck(this, Cars);
  }

  _createClass(Cars, null, [{
    key: "createCarSaleAD",

    /** Create a car sale AD.
     * @static
     * @returns {object} createCarSaleAD
     * @params {object} req
     * @params {object} res
     */
    value: function createCarSaleAD(req, res) {
      var _req$body = req.body,
          _req$body$status = _req$body.status,
          status = _req$body$status === void 0 ? 'available' : _req$body$status,
          _req$body$state = _req$body.state,
          state = _req$body$state === void 0 ? 'new' : _req$body$state,
          price = _req$body.price,
          manufacturer = _req$body.manufacturer,
          model = _req$body.model,
          bodyType = _req$body.bodyType,
          carImageUrl = _req$body.carImageUrl;
      var id = _carModels["default"][_carModels["default"].length - 1].id + 1;
      var owner = req.body.id;
      var createdOn = new Date();
      var newCreatedCarAD = {
        id: id,
        owner: owner,
        createdOn: createdOn,
        manufacturer: manufacturer,
        model: model,
        price: price,
        state: state,
        status: status,
        bodyType: bodyType,
        carImageUrl: carImageUrl
      };

      _carModels["default"].push(newCreatedCarAD);

      return res.status(201).json({
        status: 201,
        data: {
          newCreatedCarAD: newCreatedCarAD
        },
        message: 'Car Advert Successfully created'
      });
    }
    /**  View a specific car.
     * @static
     * @returns {object} ViewASpecificCar
     * @params {object} req
     * @params {object} res
     */

  }, {
    key: "ViewASpecificCar",
    value: function ViewASpecificCar(req, res) {
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

      return res.status(200).json({
        status: 200,
        data: findSpecificCar,
        message: 'Specify car seen'
      });
    }
    /**  Delete a specific car AD.
     * @static
     * @returns {object} deleteASpecificCarAD
     * @params {object} req
     * @params {object} res
     */

  }, {
    key: "deleteASpecificCarAD",
    value: function deleteASpecificCarAD(req, res) {
      var findSpecificCar = req.body.findSpecificCar;

      _carModels["default"].splice(findSpecificCar, 1);

      return res.status(200).json({
        status: 200,
        data: 'Car Ad successfully deleted'
      });
    }
    /**  Mark a posted car Ad as sold.
     * @static
     * @returns {object} updateCarStatus
     * @params {object} req
     * @params {object} res
     */

  }, {
    key: "updateCarStatus",
    value: function updateCarStatus(req, res) {
      var id = Number(req.params.id);

      var findCarId = _carModels["default"].find(function (car) {
        return car.id === id;
      });

      if (!findCarId) {
        return res.status(404).json({
          status: 404,
          error: 'Invalid car id'
        });
      }

      if (findCarId.status === 'sold') {
        return res.status(302).json({
          status: 302,
          message: 'Car is already mark as Sold'
        });
      }

      findCarId.status = 'sold';
      return res.status(200).json({
        status: 200,
        data: findCarId
      });
    }
    /** Update the price of a car.
     * @static
     * @returns {object} updateCarPrice
     * @params {object} req
     * @params {object} res
     */

  }, {
    key: "updateCarPrice",
    value: function updateCarPrice(req, res) {
      var id = req.params.id;
      var price = req.body.price;

      var findSpecificCar = _carModels["default"].find(function (car) {
        return car.id === parseInt(id, 10);
      });

      if (!price) {
        return res.status(400).json({
          status: 400,
          error: 'add new price...'
        });
      }

      if (price) {
        price = price.trim();

        if (!/^\d+$/.test(price)) {
          return res.status(400).json({
            status: 400,
            error: 'Only numbers are acceptable for price input'
          });
        }
      }

      findSpecificCar.price = price;
      return res.status(200).json({
        status: 200,
        data: findSpecificCar
      });
    }
    /** View all posted ADs whether sold or available.
     * @static
     * @returns {object} ViewAllPostedAD
     * @params {object} req
     * @params {object} res
     */

  }, {
    key: "ViewAllPostedADCar",
    value: function ViewAllPostedADCar(req, res) {
      var _req$query = req.query,
          status = _req$query.status,
          state = _req$query.state,
          manufacturer = _req$query.manufacturer,
          bodyType = _req$query.bodyType;

      if (status && state) {
        var carsByStatusState = _carModels["default"].filter(function (car) {
          return car.status === status && car.state === state;
        });

        return res.status(200).json({
          status: 200,
          data: _toConsumableArray(carsByStatusState)
        });
      }

      if (state && manufacturer) {
        // eslint-disable-next-line max-len
        var carsByManufacturer = _carModels["default"].filter(function (car) {
          return car.state === state && car.manufacturer === manufacturer;
        });

        res.status(200).json({
          status: 200,
          data: _toConsumableArray(carsByManufacturer)
        });
      }

      if (status && manufacturer) {
        // eslint-disable-next-line max-len
        var _carsByManufacturer = _carModels["default"].filter(function (car) {
          return car.status === status && car.manufacturer === manufacturer;
        });

        return res.status(200).json({
          status: 200,
          data: _toConsumableArray(_carsByManufacturer)
        });
      }

      if (status) {
        var carsByStatus = _carModels["default"].filter(function (car) {
          return car.status === status;
        });

        return res.status(200).json({
          status: 200,
          data: _toConsumableArray(carsByStatus)
        });
      }

      if (bodyType) {
        var type = _carModels["default"].filter(function (car) {
          return car.bodyType === bodyType;
        });

        return res.status(200).json({
          status: 200,
          data: _toConsumableArray(type)
        });
      }

      return res.status(200).json({
        status: 200,
        data: _toConsumableArray(_carModels["default"]),
        message: 'Success'
      });
    }
  }]);

  return Cars;
}();

var _default = Cars;
exports["default"] = _default;
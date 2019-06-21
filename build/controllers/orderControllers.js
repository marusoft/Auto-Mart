"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _orderModels = _interopRequireDefault(require("../models/orderModels"));

var _carModels = _interopRequireDefault(require("../models/carModels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import users from '../models/usersModels';

/**
 * @class Orders
 */
var Orders =
/*#__PURE__*/
function () {
  function Orders() {
    _classCallCheck(this, Orders);
  }

  _createClass(Orders, null, [{
    key: "CreateAPurchaseOrder",

    /** Create a purchase order.
     * @static
     * @returns {object} CreateAPurchaseOrder.
     * @params {object} req
     * @params {object} res
     */
    value: function CreateAPurchaseOrder(req, res) {
      var _req$body = req.body,
          priceOffered = _req$body.priceOffered,
          carId = _req$body.carId,
          _req$body$status = _req$body.status,
          status = _req$body$status === void 0 ? 'pending' : _req$body$status;
      var id = _orderModels["default"][_orderModels["default"].length - 1].id + 1;
      var createdOn = new Date();

      var findCar = _carModels["default"].find(function (car) {
        return car.id === Number(carId);
      });

      if (!findCar) {
        res.status(404).json({
          status: 404,
          error: 'Car cannot be found'
        });
      }

      var carIndexValue = findCar.id;
      var price = findCar.price;
      var newPurchaseOrder = {
        id: id,
        carIndexValue: carIndexValue,
        createdOn: createdOn,
        status: status,
        price: price,
        priceOffered: priceOffered
      };

      _orderModels["default"].push(newPurchaseOrder);

      return res.status(201).json({
        status: 201,
        data: {
          newPurchaseOrder: newPurchaseOrder
        }
      });
    }
  }]);

  return Orders;
}();

var _default = Orders;
exports["default"] = _default;
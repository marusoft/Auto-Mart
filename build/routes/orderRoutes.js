"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _orderControllers = _interopRequireDefault(require("../controllers/orderControllers"));

var _orderValidation = _interopRequireDefault(require("../middlewares/orderValidation"));

var _authUser = _interopRequireDefault(require("../middlewares/authUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderRouter = _express.default.Router();

orderRouter.post('/order', _authUser.default.verifyUser, _orderValidation.default.validateOrdersDetails, _orderControllers.default.CreateAPurchaseOrder);
orderRouter.patch('/order/:orderId/price', _authUser.default.verifyUser, _orderControllers.default.updatePurchaseOrderPrice);
var _default = orderRouter;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _orderControllers = _interopRequireDefault(require("../controllers/orderControllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var orderRouter = _express["default"].Router();

orderRouter.post('/order', _orderControllers["default"].CreateAPurchaseOrder);
var _default = orderRouter;
exports["default"] = _default;
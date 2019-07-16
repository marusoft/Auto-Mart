"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _flagController = _interopRequireDefault(require("../controllers/flagController"));

var _flagValidation = _interopRequireDefault(require("../middlewares/flagValidation"));

var _authUser = _interopRequireDefault(require("../middlewares/authUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const flagRouter = _express.default.Router();

flagRouter.post('/flag', _authUser.default.verifyUser, _flagValidation.default.validateFlagDetails, _flagController.default.flagPostedAdAsFraud);
var _default = flagRouter;
exports.default = _default;
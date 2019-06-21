"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _usersController = _interopRequireDefault(require("../controllers/usersController"));

var _usersValidator = _interopRequireDefault(require("../middlewares/usersValidator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.post('/auth/signup', _usersValidator["default"].ValidateUserSignUpInput, _usersController["default"].createUsers);
userRouter.post('/auth/signin', _usersValidator["default"].ValidateUserSignInInput, _usersController["default"].loginUsers);
var _default = userRouter;
exports["default"] = _default;
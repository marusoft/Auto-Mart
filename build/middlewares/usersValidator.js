"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validatorjs = _interopRequireDefault(require("validatorjs"));

var _usersModels = _interopRequireDefault(require("../models/usersModels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * UsersValidation
 */
var UsersValidation =
/*#__PURE__*/
function () {
  function UsersValidation() {
    _classCallCheck(this, UsersValidation);
  }

  _createClass(UsersValidation, null, [{
    key: "ValidateUserSignUpInput",

    /**
     * @returns {object} ValidateUserSignUpInput
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    value: function ValidateUserSignUpInput(req, res, next) {
      var _req$body = req.body,
          email = _req$body.email,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          password = _req$body.password,
          address = _req$body.address;
      var constraint = {
        email: 'required|email|min:12|max:30',
        firstName: 'required|min:3|max:20|alpha',
        lastName: 'required|min:3|max:20|alpha',
        password: 'required|min:8|max:14',
        address: 'required'
      }; // eslint-disable-next-line new-cap

      var validation = new _validatorjs["default"](req.body, constraint);

      if (validation.fails()) {
        return res.status(400).json({
          status: 'Bad Request',
          error: validation.errors.errors
        });
      }

      email = email.toLowerCase().trim();

      var FoundEmailInModels = _usersModels["default"].find(function (user) {
        return user.email === email;
      });

      if (FoundEmailInModels) {
        return res.status(409).json({
          status: 'Conflict',
          error: 'Email already registered, proceed to sigin...'
        });
      }

      req.body.email = email;
      req.body.firstName = firstName.toLowerCase().trim();
      req.body.lastName = lastName.toLowerCase().trim();
      req.body.password = password.trim();
      req.body.address = address.trim();
      return next();
    }
    /**
     * @returns {object} ValidateUserSignInInput
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */

  }, {
    key: "ValidateUserSignInInput",
    value: function ValidateUserSignInInput(req, res, next) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;
      var constraint = {
        email: 'required|email',
        password: 'required'
      }; // eslint-disable-next-line new-cap

      var validation = new _validatorjs["default"](req.body, constraint);

      if (validation.fails()) {
        return res.status(400).json({
          status: 'Bad Request',
          error: validation.errors.errors
        });
      }

      email = email.toLowerCase().trim();

      var FoundEmailInModels = _usersModels["default"].find(function (user) {
        return user.email === email;
      });

      if (!FoundEmailInModels) {
        return res.status(401).json({
          status: 'Unauthorized',
          error: 'Cannot verify user details'
        });
      }

      password = password.trim();

      if (FoundEmailInModels && password !== FoundEmailInModels.password) {
        return res.status(401).json({
          status: 'Unauthorized',
          error: 'Input details does to match'
        });
      }

      req.body.FoundEmailInModels = FoundEmailInModels;
      req.body.password = password;
      return next();
    }
  }]);

  return UsersValidation;
}();

var _default = UsersValidation;
exports["default"] = _default;
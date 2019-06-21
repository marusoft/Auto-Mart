"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _usersModels = _interopRequireDefault(require("../models/usersModels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @class Users
 */
var Users =
/*#__PURE__*/
function () {
  function Users() {
    _classCallCheck(this, Users);
  }

  _createClass(Users, null, [{
    key: "createUsers",

    /**
     * @static
     * @returns {object} createUsers
     * @params {object} req
     * @params {object} res
     */
    value: function createUsers(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          password = _req$body.password,
          address = _req$body.address;
      var newUser = {
        id: _usersModels["default"].length + 1,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        address: address
      };

      _usersModels["default"].push(newUser);

      res.status(201).json({
        newUser: newUser,
        message: 'Successfully created'
      });
    }
    /**
     * @static
     * @returns {object} loginUsers
     * @params {*} req
     * @params {*} res
     */

  }, {
    key: "loginUsers",
    value: function loginUsers(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      var foundUserEmail = _usersModels["default"].find(function (user) {
        return user.email === email;
      });

      var foundUserPassword = _usersModels["default"].find(function (pass) {
        return pass.password === password;
      });

      if (foundUserEmail && foundUserPassword) {
        res.status(200).json({
          message: 'You signed in ...'
        });
      } else {
        res.status(401).json({
          error: 'You need to register or supply the correct input ...'
        });
      }
    }
  }]);

  return Users;
}();

var _default = Users;
exports["default"] = _default;
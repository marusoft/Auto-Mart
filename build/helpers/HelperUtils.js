"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const secretKey = process.env.SECRET_KEY;
const salt = +process.env.SALT;
/**
 * @class Helper
 * @exports Helper
 */

class Helper {
  /**
   * @method generateToken
   * @param {string} payload
   * @returns token
   */
  static generateToken(payload) {
    const token = _jsonwebtoken.default.sign(payload, secretKey, {
      expiresIn: '24h'
    });

    return token;
  }
  /**
   * @method verifyToken
   * @param {string} token
   * @returns payload
   */


  static verifyToken(token) {
    try {
      const payload = _jsonwebtoken.default.verify(token, secretKey);

      return payload;
    } catch (error) {
      return false;
    }
  }
  /**
   * @method hashPassword
   * @param {string} password
   * @returns {sring} hash password
   */


  static hashPassword(password) {
    return _bcryptjs.default.hashSync(password, salt);
  }
  /**
   * @method verifyPassword
   * @param {string} password
   * @param hash
   * @returns
   */


  static verifyPassword(hashPassword, password) {
    return _bcryptjs.default.compareSync(password, hashPassword);
  }

}

exports.default = Helper;
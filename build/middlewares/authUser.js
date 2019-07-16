"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HelperUtils = _interopRequireDefault(require("../helpers/HelperUtils"));

var _connection = _interopRequireDefault(require("../db/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable consistent-return */

/**
 * @class UserAuthentication
 * @description Authenticates a given user
 * @exports UserAuthentication
 */
class UserAuthentication {
  /**
   * @method verifyAuthHeader
   * @description
   * @param {object} req
   * @param {object} res
   * @returns payload
   */
  static verifyAuthHeader(req) {
    if (!req.headers.authorization) {
      return {
        error: 'auth'
      };
    }

    const token = req.headers.authorization.split(' ')[1];

    const payload = _HelperUtils.default.verifyToken(token);

    if (!payload) {
      return {
        error: 'token'
      };
    }

    return payload;
  }
  /**
   * @method verifyUser
   * @description Verifies the token provided by the user
   * @param {object} req
   * @param {object} res
   * @returns
   */


  static verifyUser(req, res, next) {
    const payload = UserAuthentication.verifyAuthHeader(req);
    let error;
    let status;

    if (payload && payload.error === 'auth') {
      status = 401;
      error = 'No authorization header was specified';
    } else if (payload && payload.error === 'token') {
      status = 401;
      error = 'The provided token cannot be authenticated.';
    }

    if (error) {
      return res.status(status).json({
        status,
        error
      });
    }

    req.user = payload;
    next();
  }
  /**
   * @method verifyAdmin
   * @description Verifies the token provided by the Admin
   * @param {object} req
   * @param {object} res
   * @returns
   */


  static verifyAdmin(req, res, next) {
    const payload = UserAuthentication.verifyAuthHeader(req);
    let error;
    let status;

    if (payload && payload.error === 'auth') {
      status = 401;
      error = 'No authorization header was specified';
      return res.status(status).json({
        status,
        error
      });
    }

    if (payload && payload.error === 'token') {
      status = 401;
      error = 'Token provided cannot be authenticated.';
      return res.status(status).json({
        status,
        error
      });
    }

    if (payload.isadmin !== true) {
      return res.status(403).json({
        status: 403,
        error: 'Only admin can access this route'
      });
    }

    next();
  }
  /**
   * @method isOwner
   * @description check for car owner
   * @param {object} req
   * @param {object} res
   * @returns Car Owner
   */


  static async isOwner(req, res, next) {
    // eslint-disable-next-line camelcase
    const {
      user_id
    } = req.user;
    const {
      id
    } = req.params;
    const value = Number(id); // let foundCar;

    const CarSql = 'SELECT * FROM cars WHERE id = $1';

    try {
      const {
        rows,
        rowCount
      } = await _connection.default.query(CarSql, [value]);

      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Car not found'
        });
      } // eslint-disable-next-line camelcase


      if (user_id !== rows[0].owner_id) {
        return res.status(401).json({
          status: 401,
          error: 'You can not edit this AD'
        });
      }

      return next();
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  }

}

var _default = UserAuthentication;
exports.default = _default;
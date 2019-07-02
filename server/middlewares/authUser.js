/* eslint-disable consistent-return */
import Helper from '../helpers/HelperUtils';
import cars from '../models/carModels';
import users from '../models/usersModels';


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
      return { error: 'auth' };
    }
    const token = req.headers.authorization.split(' ')[1];
    const payload = Helper.verifyToken(token);

    if (!payload) {
      return { error: 'token' };
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
      return res.status(status).json({ status, error });
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
        error,
      });
    }

    if (payload && payload.error === 'token') {
      status = 401;
      error = 'Token provided cannot be authenticated.';
      return res.status(status).json({
        status,
        error,
      });
    }

    if (payload.isAdmin !== true) {
      return res.status(403).json({
        status: 403,
        error: 'Only admin can access this route',
      });
    }
    next();
  }
  /**
   * @method isOwner
   * @description check for car owner
   * @param {object} req
   * @param {object} res
   * @returns
   */

  static isOwner(req, res, next) {
    const { email } = req.user;
    const { id } = req.params;
    const value = Number(id);
    const foundUser = users.find(user => user.email === email);
    const foundCar = cars.find(car => car.id === value);
    if (!foundCar) {
      return res.status(404).json({
        status: 404,
        error: 'Invalid car id',
      });
    }
    if (foundUser.id !== foundCar.owner) {
      return res.status(401).json({
        status: 401,
        error: 'You can not edit this ad',
      });
    }
    return next();
  }
}

export default UserAuthentication;

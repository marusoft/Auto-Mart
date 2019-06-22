import Helper from '../helpers/HelperUtils';


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
      res.status(status).json({ status, error });
      return;
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
      res.status(status).json({
        status,
        error,
      });
      return;
    }

    if (payload && payload.error === 'token') {
      status = 401;
      error = 'Token provided cannot be authenticated.';
      res.status(status).json({
        status,
        error,
      });
      return;
    }

    if (payload.isAdmin !== true) {
      res.status(403).json({
        status: 403,
        error: 'Only admin can access this route',
      });
      return;
    }
    next();
  }
}

export default UserAuthentication;

import validator from 'validatorjs';
import pool from '../db/connection';
import Helper from '../helpers/HelperUtils';

/**
 * UsersValidation
 */

class UsersValidation {
  /**
   * @returns {object} ValidateUserSignUpInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async ValidateUserSignUpInput(req, res, next) {
    let {
      // eslint-disable-next-line prefer-const
      email, firstName, lastName, password, address,
    } = req.body;

    const constraint = {
      email: 'required|email|min:12|max:30',
      firstName: 'required|min:3|max:20|alpha',
      lastName: 'required|min:3|max:20|alpha',
      password: 'required|min:8|max:14',
      address: 'required',
    };

    // eslint-disable-next-line new-cap
    const validation = new validator(req.body, constraint);
    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors,
      });
    }
    email = email.toLowerCase().trim();
    try {
      const findEmail = 'SELECT * FROM users WHERE email = $1';
      const value = [email];
      const { rows } = await pool.query(findEmail, value);
      if (rows[0]) {
        return res.status(409).json({
          status: 409,
          error: 'Conflict, Email already registered, proceed to sigin...',
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: error.message,
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
  static async ValidateUserSignInInput(req, res, next) {
    let { email, password } = req.body;
    const constraint = {
      email: 'required|email',
      password: 'required',
    };

    // eslint-disable-next-line new-cap
    const validation = new validator(req.body, constraint);
    if (validation.fails()) {
      return res.status(400).json({
        status: 400,
        error: validation.errors.errors,
      });
    }
    email = email.toLowerCase().trim();
    try {
      const findIfUserExist = 'SELECT * FROM users WHERE email = $1';
      const value = [email];
      const { rows } = await pool.query(findIfUserExist, value);
      const foundEmail = rows[0];
      if (!foundEmail) {
        return res.status(401).json({
          status: 401,
          error: `${req.body.email} does not exit, Please register an account or signup`,
        });
      }
      password = password.trim();
      if (!Helper.verifyPassword(rows[0].password, req.body.password)) {
        return res.status(400).json({
          error: 'Password is incorrect',
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
    req.body.password = password;
    return next();
  }
}
export default UsersValidation;

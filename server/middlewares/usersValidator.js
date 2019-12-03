/* eslint-disable camelcase */
/* eslint-disable prefer-const */
import validator from 'validatorjs';
import pool from '../db/connection';

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
      email, first_name, last_name, password, address,
    } = req.body;

    const constraint = {
      email: 'required|email|min:12|max:30',
      first_name: 'required|min:3|max:20|alpha',
      last_name: 'required|min:3|max:20|alpha',
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
      return res.status(500).json({
        error,
      });
    }

    req.body.email = email;
    req.body.first_name = first_name.toLowerCase().trim();
    req.body.last_name = last_name.toLowerCase().trim();
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
      // const foundEmail = rows[0].email;
      if (!rows[0]) {
        return res.status(401).json({
          status: 401,
          error: `${req.body.email} does not exist, Please register an account or signup`,
        });
      }
      password = password.trim();
      // if (!Helper.verifyPassword(rows[0].password, req.body.password)) {
      //   return res.status(400).json({
      //     status: 400,
      //     error: 'Password is incorrect',
      //   });
      // }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
    req.body.email = email;
    req.body.password = password;
    return next();
  }
}
export default UsersValidation;

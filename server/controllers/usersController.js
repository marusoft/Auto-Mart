import Helper from '../helpers/HelperUtils';
import pool from '../db/connection';

/**
 * @class Users
 */

class Users {
  /** Create User
   * @static
   * @method createUsers
   * @returns {object}
   * @params {object} req
   * @params {object} res
   */
  static async createUsers(req, res) {
    const {
      email, firstName, lastName, password, address,
    } = req.body;
    const hashedPassword = Helper.hashPassword(password);
    const sql = `INSERT INTO users(email, firstName, lastName, password, address) VALUES($1, $2, $3, $4, $5)
    RETURNING *`;
    const values = [email, firstName, lastName, hashedPassword, address];
    try {
      const { rows } = await pool.query(sql, values);
      const token = Helper.generateToken({ rows });
      return res.status(201).json({
        status: 201,
        data: {
          token,
          ...rows[0],

        },
        message: `${req.body.firstName}, your account was successfully created`,
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 409,
          error: 'User with that email already exist',
        });
      }
      return res.status(500).json({
        status: 500,
        error: 'An internal error occurred at the server',
      });
    }
  }

  /** Login User
   * @static
   * @returns {object} loginUsers
   * @params {*} req
   * @params {*} res
   */
  static async loginUsers(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 400,
        error: 'Either password or email is incorrect',
      });
    }
    const sql = 'SELECT * FROM users WHERE email = $1';
    const value = [req.body.email];
    try {
      const { rows } = await pool.query(sql, value);
      if (!rows[0]) {
        return res.status(400).json({
          status: 400,
          error: 'Account details incorrect',
        });
      }
      if (!Helper.verifyPassword(rows[0].password, req.body.password)) {
        return res.status(400).json({
          error: 'Password does not match',
        });
      }
      const token = Helper.generateToken(rows[0]);
      return res.status(200).json({
        status: 200,
        data: {
          token,
        },
        message: `Welcome back ${rows[0].firstname}, your login was successful`,
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}
export default Users;

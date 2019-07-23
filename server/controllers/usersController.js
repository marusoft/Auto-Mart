/* eslint-disable consistent-return */
/* eslint-disable camelcase */
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
      email, first_name, last_name, password, address,
    } = req.body;
    const hashedPassword = Helper.hashPassword(password);
    const sql = `INSERT INTO users(email, first_name, last_name, password, address) VALUES($1, $2, $3, $4, $5)
    RETURNING *`;
    const values = [email, first_name, last_name, hashedPassword, address];
    try {
      const { rows } = await pool.query(sql, values);
      const token = Helper.generateToken({ rows });
      return res.status(201).json({
        status: 201,
        data: {
          token,
          ...rows[0],

        },
        message: `${req.body.first_name}, your account was successfully created`,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
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
    const { email } = req.body;
    // if (!req.body.email || !req.body.password) {
    //   return res.status(400).json({
    //     status: 400,
    //     error: 'Either password or email is incorrect',
    //   });
    // }
    const sql = 'SELECT * FROM users WHERE email = $1';
    const value = [email];
    try {
      const { rows } = await pool.query(sql, value);
      if (rows[0]) {
        const result = Helper.verifyPassword(rows[0].password, req.body.password);
        if (result) {
          const token = Helper.generateToken(rows[0]);
          return res.status(200).json({
            status: 200,
            data: {
              token,
              message: `Welcome back ${rows[0].first_name}, your login was successful`,
            },
          });
        }

        return res.status(401).json({
          status: 401,
          error: 'Password does not match.',
        });
      }
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }
}
export default Users;

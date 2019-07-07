/* eslint-disable no-unused-vars */
import regeneratorRuntime from 'regenerator-runtime';
import users from '../models/usersModels';
import Helper from '../helpers/HelperUtils';
import pool from '../db/connection';

/**
 * @class Users
 */

class Users {
  /**
   * @static
   * @method createUsers
   * @returns {void}
   * @params {object} req
   * @params {object} res
   */
  static async createUsers(req, res) {
    const {
      email, firstName, lastName, password, address, isAdmin,
    } = req.body;
    const hashedPassword = Helper.hashPassword(password);
    const sql = `INSERT INTO users(email, firstName, lastName, password, address, isAdmin) VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *`;
    const values = [email, firstName, lastName, hashedPassword, address, isAdmin];
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

  // /**
  //  * @static
  //  * @returns {object} loginUsers
  //  * @params {*} req
  //  * @params {*} res
  //  */
  // static loginUsers(req, res) {
  //   const { email, password } = req.body;
  //   const foundUserEmail = users.find(user => user.email === email);
  //   const foundUserPassword = users.find(pass => pass.password === password);
  //   const token = Helper.generateToken(foundUserEmail);
  //   if (foundUserEmail && foundUserPassword) {
  //     res.status(200).json({
  //       status: 200,
  //       data: {
  //         token,
  //       },
  //       message: 'You signed in ...',
  //     });
  //   } else {
  //     res.status(401).json({
  //       error: 'You need to register or supply the correct input ...',
  //     });
  //   }
  // }
}
export default Users;

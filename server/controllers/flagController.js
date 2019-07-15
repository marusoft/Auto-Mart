/* eslint-disable camelcase */
import moment from 'moment';
import pool from '../db/connection';

/**
 * @class Flag
 */

class Flag {
  /** flag/report a posted AD as fraudulent.
   * @static
   * @returns {object} flagPostedAdAsFraud
   * @params {object} req
   * @params {object} res
   */
  static async flagPostedAdAsFraud(req, res) {
    const created_on = moment(new Date());
    const { car_id, reason, description } = req.body;

    const value = Number(car_id);
    const findCarToReport = 'SELECT * FROM cars WHERE id = $1';
    try {
      const { rowCount } = await pool.query(findCarToReport, [value]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Cannot find car to report/flag.',
        });
      }

      const flagSql = `INSERT INTO flag(car_id, created_on, reason, description) VALUES($1, $2, $3, $4)
      RETURNING *`;
      const values = [value, created_on, reason, description];
      const reportAD = await pool.query(flagSql, values);
      const data = reportAD.rows[0];
      return res.status(201).json({
        status: 201,
        data: {
          data,
        },
        message: 'This AD is fraud',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}


export default Flag;

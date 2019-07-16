"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _connection = _interopRequireDefault(require("../db/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */

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
    const createdOn = (0, _moment.default)(new Date());
    const {
      car_id,
      reason,
      description
    } = req.body;
    const value = Number(car_id);
    const findCarToReport = 'SELECT * FROM cars WHERE id = $1';

    try {
      const {
        rowCount
      } = await _connection.default.query(findCarToReport, [value]);

      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Cannot find car to report/flag.'
        });
      }

      const flagSql = `INSERT INTO flag(car_id, createdOn, reason, description) VALUES($1, $2, $3, $4)
      RETURNING *`;
      const values = [value, createdOn, reason, description];
      const reportAD = await _connection.default.query(flagSql, values);
      const data = reportAD.rows[0];
      return res.status(201).json({
        status: 201,
        data: {
          data
        },
        message: 'This AD is fraud'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

}

var _default = Flag;
exports.default = _default;
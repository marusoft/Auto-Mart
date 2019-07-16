"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _connection = _interopRequireDefault(require("../../connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const flagsTable = ` DROP TABLE IF EXISTS flag;
  CREATE TABLE IF NOT EXISTS flag(
    flag_id SERIAL PRIMARY KEY NOT NULL,
    car_id  INTEGER NOT NULL,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(225) NOT NULL,
    description VARCHAR(225) NOT NULL,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
  )`;
/**
 * Function representing OrderTableHandler
 * @returns {object} representing sucess or failure
 */

async function createFlagTable() {
  try {
    const create = await _connection.default.query(flagsTable); // eslint-disable-next-line no-console

    console.log(`flagsTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`flagsTable ${error}`);
  }
}

var _default = createFlagTable;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _connection = _interopRequireDefault(require("../../connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ordersTable = `DROP TABLE IF EXISTS orders CASCADE;
DROP TYPE IF EXISTS order_status;
  CREATE TYPE order_status as ENUM ('pending', 'accepted','rejected');
  CREATE TABLE IF NOT EXISTS orders(
    order_id SERIAL PRIMARY KEY NOT NULL,
    buyer_id INTEGER NOT NULL,
    car_id  INTEGER NOT NULL,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status order_status DEFAULT 'pending',
    priceOffered FLOAT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
  )`;
/**
 * Function representing OrderTableHandler
 * @returns {object} representing sucess or failure
 */

async function createOrdersTable() {
  try {
    const create = await _connection.default.query(ordersTable); // eslint-disable-next-line no-console

    console.log(`ordersTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`ordersTable ${error}`);
  }
}

var _default = createOrdersTable;
exports.default = _default;
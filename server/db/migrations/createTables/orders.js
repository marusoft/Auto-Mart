/* eslint-disable no-console */
import pool from '../../connection';

const ordersTable = `DROP TABLE IF EXISTS orders CASCADE;
DROP TYPE IF EXISTS order_status;
  CREATE TYPE order_status as ENUM ('pending', 'accepted','rejected');
  CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY NOT NULL,
    buyer_id INTEGER NOT NULL,
    car_id  INTEGER NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status order_status DEFAULT 'pending',
    amount VARCHAR(50) NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
  )`;

/**
 * Function representing OrderTableHandler
 * @returns {object} representing sucess or failure
 */
async function createOrdersTable() {
  try {
    const create = await pool.query(ordersTable);
    console.log(`ordersTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(`ordersTable ${error}`);
  }
}

export default createOrdersTable;

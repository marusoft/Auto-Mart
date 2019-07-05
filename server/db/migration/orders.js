import pool from '../connection';

const ordersTable = `
  DROP TYPE IF EXISTS order_status;
  CREATE TYPE order_status as ENUM ('pending', 'accepted','rejected');
  CREATE TABLE IF NOT EXISTS orders(
    order_id SERIAL PRIMARY KEY NOT NULL,
    buyer_id INTEGER NOT NULL,
    car_id  INTEGER NOT NULL,
    amount FLOAT NOT NULL,
    status order_status DEFAULT 'pending',
    FOREIGN KEY (buyer_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
  )`;

/**
 * Function representing OrderTableHandler
 * @returns {object} representing sucess or failure
 */
async function createOrdersTable() {
  try {
    const create = await pool.query(ordersTable);
    // eslint-disable-next-line no-console
    console.log(`ordersTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`ordersTable ${error}`);
  }
}

export default createOrdersTable;

import pool from '../../connection';

const carsTable = `DROP TABLE IF EXISTS cars CASCADE;
DROP TYPE IF EXISTS car_status;
  CREATE TYPE car_status as ENUM ('available', 'sold');
  CREATE TABLE IF NOT EXISTS cars(
    id SERIAL PRIMARY KEY NOT NULL,
    owner_id INTEGER NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    state VARCHAR(100) NOT NULL,
    status car_status DEFAULT 'available',
    price VARCHAR(50) NOT NULL,
    manufacturer VARCHAR(150) NOT NULL,
    model VARCHAR(150) NOT NULL,
    body_type VARCHAR(150) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    img_url TEXT NOT NULL
  )`;

/**
 * Function representing CarsTableHandler
 * @returns {object} representing sucess or failure
 */
async function createCarsTable() {
  try {
    const create = await pool.query(carsTable);
    // eslint-disable-next-line no-console
    console.log(`carsTable, ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`carsTable ${error}`);
  }
}

export default createCarsTable;

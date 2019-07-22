/* eslint-disable no-console */
import pool from '../../connection';

const flagsTable = ` DROP TABLE IF EXISTS flag CASCADE;
  CREATE TABLE IF NOT EXISTS flag(
    id SERIAL PRIMARY KEY NOT NULL,
    car_id INTEGER NOT NULL,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(225) NOT NULL,
    description VARCHAR(225) NOT NULL,
    FOREIGN KEY (car_id) REFERENCES cars(id)
  )`;

/**
 * Function representing OrderTableHandler
 * @returns {object} representing sucess or failure
 */
async function createFlagTable() {
  try {
    const create = await pool.query(flagsTable);
    console.log(`flagsTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(`flagsTable ${error}`);
  }
}

export default createFlagTable;

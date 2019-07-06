import pool from '../../connection';

const flagsTable = ` DROP TABLE IF EXISTS flag;
  CREATE TABLE IF NOT EXISTS flag(
    flag_id SERIAL PRIMARY KEY NOT NULL,
    carId  INTEGER NOT NULL,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(225) NOT NULL,
    description VARCHAR(225) NOT NULL,
    FOREIGN KEY (carId) REFERENCES cars(id) ON DELETE CASCADE
  )`;

/**
 * Function representing OrderTableHandler
 * @returns {object} representing sucess or failure
 */
async function createFlagTable() {
  try {
    const create = await pool.query(flagsTable);
    // eslint-disable-next-line no-console
    console.log(`flagsTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`flagsTable ${error}`);
  }
}

export default createFlagTable;

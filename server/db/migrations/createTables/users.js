import pool from '../../connection';

const usersTable = `DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(130) NOT NULL,
    last_name VARCHAR(130) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(200) NOT NULL,
    is_admin BOOLEAN DEFAULT false NOT NULL
  )`;


/**
 * Function representing UserTableHandler
 * @returns {object} representing sucess or failure
 */
async function createUsersTable() {
  try {
    const create = await pool.query(usersTable);
    // eslint-disable-next-line no-console
    console.log(`userTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`userTable ${error}`);
  }
}

export default createUsersTable;

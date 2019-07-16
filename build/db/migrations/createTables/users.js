"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _connection = _interopRequireDefault(require("../../connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersTable = `DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    firstName VARCHAR(130) NOT NULL,
    lastName VARCHAR(130) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(200) NOT NULL,
    isAdmin BOOLEAN DEFAULT false NOT NULL
  )`;
/**
 * Function representing UserTableHandler
 * @returns {object} representing sucess or failure
 */

async function createUsersTable() {
  try {
    const create = await _connection.default.query(usersTable); // eslint-disable-next-line no-console

    console.log(`userTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`userTable ${error}`);
  }
}

var _default = createUsersTable;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv/config");

var _pg = require("pg");

const pool = new _pg.Pool({
  connectionString: process.env.TEST_ENV ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL
});
var _default = pool;
exports.default = _default;
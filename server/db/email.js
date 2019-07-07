import pool from './connection';


/**
 * @class email
 */
class Email {
  static async allEmails(email) {
    const sql = 'SELECT * FROM usersModels ORDER BY id ASC';
    const value = [email];
    const { rows } = await pool.query(sql, value);
    return rows[0];
  }
}

export default Email;

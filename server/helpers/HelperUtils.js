import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY;
const salt = +process.env.SALT;

export default class Helper {
  static generateToken(payload) {
    const token = jwt.sign(payload, secretKey);
    return token;
  }

  static verifyToken(token) {
    try {
      const payload = jwt.verify(token, secretKey);
      return payload;
    } catch (error) {
      return false;
    }
  }


  static hashPassword(password) {
    return bcrypt.hashSync(password, salt);
  }

  /**
   * @method verifyPassword
   * @description
   * @returns
   */
  static verifyPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

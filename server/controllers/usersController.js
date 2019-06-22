import users from '../models/usersModels';
import Helper from '../helpers/HelperUtils';
/**
 * @class Users
 */

class Users {
  /**
   * @static
   * @returns {object} createUsers
   * @params {object} req
   * @params {object} res
   */
  static createUsers(req, res) {
    const {
      email, firstName, lastName, password, address,
    } = req.body;
    const hashedPassword = Helper.hashPassword(password);
    const newUser = {
      id: users.length + 1,
      email,
      firstName,
      lastName,
      password,
      address,
      hashedPassword,
    };
    const token = Helper.generateToken(newUser);
    users.push(newUser);
    res.status(201).json({
      status: 201,
      data: {
        token,
        newUser,
      },
      message: 'Successfully created',
    });
  }

  /**
   * @static
   * @returns {object} loginUsers
   * @params {*} req
   * @params {*} res
   */
  static loginUsers(req, res) {
    const { email, password } = req.body;
    const foundUserEmail = users.find(user => user.email === email);
    const foundUserPassword = users.find(pass => pass.password === password);
    const token = Helper.generateToken(foundUserEmail);
    if (foundUserEmail && foundUserPassword) {
      res.status(200).json({
        status: 200,
        data: {
          token,
        },
        message: 'You signed in ...',
      });
    } else {
      res.status(401).json({
        error: 'You need to register or supply the correct input ...',
      });
    }
  }
}
export default Users;

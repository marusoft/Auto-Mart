import users from '../models/usersModels';
/**
 * @class Users
 */

class Users {
  /**
   * @static
   * @returns {object} createUsers
   * @params {*} req
   * @params {*} res
   */
  static createUsers(req, res) {
    const {
      email, firstName, lastName, password, address,
    } = req.body;
    const newUser = {
      id: users.length + 1,
      email,
      firstName,
      lastName,
      password,
      address,
    };
    users.push(newUser);
    res.status(201).json({
      newUser,
      message: 'Successfully created',
    });
  }
}
export default Users;

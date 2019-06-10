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
    if (foundUserEmail && foundUserPassword) {
      res.status(200).json({
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

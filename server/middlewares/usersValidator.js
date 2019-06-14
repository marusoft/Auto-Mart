import validator from 'validatorjs';
import users from '../models/usersModels';

/**
 * UsersValidation
 */

class UsersValidation {
  /**
   * @returns {object} ValidateUserSignUpInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static ValidateUserSignUpInput(req, res, next) {
    let {
      // eslint-disable-next-line prefer-const
      email, firstName, lastName, password, address,
    } = req.body;

    const constraint = {
      email: 'required|email|min:12|max:30',
      firstName: 'required|min:3|max:20|alpha',
      lastName: 'required|min:3|max:20|alpha',
      password: 'required|min:8|max:14',
      address: 'required',
    };

    // eslint-disable-next-line new-cap
    const validation = new validator(req.body, constraint);
    if (validation.fails()) {
      return res.status(400).json({
        status: 'Bad Request',
        error: validation.errors.errors,
      });
    }
    email = email.toLowerCase().trim();
    const FoundEmailInModels = users.find(user => user.email === email);
    if (FoundEmailInModels) {
      return res.status(409).json({
        status: 'Conflict',
        error: 'Email already registered, proceed to sigin...',
      });
    }
    req.body.email = email;
    req.body.firstName = firstName.toLowerCase().trim();
    req.body.lastName = lastName.toLowerCase().trim();
    req.body.password = password.trim();
    req.body.address = address.trim();
    return next();
  }

  /**
   * @returns {object} ValidateUserSignInInput
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static ValidateUserSignInInput(req, res, next) {
    let { email, password } = req.body;
    const constraint = {
      email: 'required|email',
      password: 'required',
    };

    // eslint-disable-next-line new-cap
    const validation = new validator(req.body, constraint);
    if (validation.fails()) {
      return res.status(400).json({
        status: 'Bad Request',
        error: validation.errors.errors,
      });
    }
    email = email.toLowerCase().trim();
    const FoundEmailInModels = users.find(user => user.email === email);
    if (!FoundEmailInModels) {
      return res.status(401).json({
        status: 'Unauthorized',
        error: 'Cannot verify user dtails',
      });
    }
    password = password.trim();
    if (FoundEmailInModels && password !== FoundEmailInModels.password) {
      return res.status(401).json({
        status: 'Unauthorized',
        error: 'Input details does to match',
      });
    }
    req.body.FoundEmailInModels = FoundEmailInModels;
    req.body.password = password;
    return next();
  }
}
export default UsersValidation;

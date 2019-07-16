"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Flag/Report AD Validation
 * @class FlagValidation
 */
class FlagValidation {
  /**
   * @returns {object} validateCarsDetails
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static validateFlagDetails(req, res, next) {
    // eslint-disable-next-line prefer-const
    let {
      reason,
      description
    } = req.body;

    if (reason === '') {
      return res.status(400).json({
        error: 'Please specify the reason for this AD'
      });
    }

    if (reason) {
      reason = reason.toLowerCase().trim();

      if (/[^a-zA-Z ]/.test(reason)) {
        return res.status(406).json({
          message: 'Only Alphabets input are acceptable'
        });
      }
    }

    if (description === '') {
      return res.status(400).json({
        error: 'Please specify the description for this AD'
      });
    }

    if (description) {
      description = description.toLowerCase().trim();

      if (/[^a-zA-Z ]/.test(description)) {
        return res.status(406).json({
          message: 'Only Alphabets input are acceptable'
        });
      }
    }

    return next();
  }

}

var _default = FlagValidation;
exports.default = _default;

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
    let { reason, description } = req.body;
    if (reason === undefined) {
      return res.status(404).json({
        error: 'Please specify the reason for reason this AD',
      });
    }
    if (reason) {
      reason = reason.trim();
      if (/[^a-zA-Z]/.test(reason)) {
        return res.status(406).json({
          message: 'Only Alphabets input are acceptable',
        });
      }
    }
    if (description === undefined) {
      return res.status(404).json({
        error: 'Please specify the reason for reason this AD',
      });
    }
    if (description) {
      description = description.trim();
      if (/[^a-zA-Z]/.test(reason)) {
        return res.status(406).json({
          message: 'Only Alphabets input are acceptable',
        });
      }
    }
    return next();
  }
}

export default FlagValidation;

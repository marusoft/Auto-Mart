/* eslint-disable prefer-const */
/* eslint-disable camelcase */
/**
 * Order Validation
 * @class OrderValidation
 */

class OrderValidation {
  /**
  * @param {object} req
  * @param {object} res
  * @param {function} next
  * @returns {object}
  */

  // eslint-disable-next-line consistent-return
  static validateOrdersDetails(req, res, next) {
    let { amount } = req.body;
    if (!amount) {
      return res.status(404).json({
        error: 'Please offer amount is required.',
      });
    }
    if (amount) {
      // price = price.trim();
      if (!/^\d+$/.test(amount)) {
        return res.status(406).json({
          message: 'amount offered should be numbers only',
        });
      }
    }

    req.body.price = amount;
    next();
  }
}
export default OrderValidation;

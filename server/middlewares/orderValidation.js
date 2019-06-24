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
    let { priceOffered } = req.body;
    const errors = [];

    priceOffered = priceOffered.trim();
    if (!priceOffered) {
      const error = {
        message: 'please specify an amount',
      };
      errors.push(error);
    }

    if (!/^\d+$/.test(priceOffered)) {
      const error = {
        message: 'price offered should be numbers only',
      };
      errors.push(error);
    }

    if (errors.length) {
      return res.status(400).json({
        status: 400,
        errors: {
          body: errors.map(err => err.message),
        },
      });
    }

    req.body.priceOffered = priceOffered;
    next();
  }
}
export default OrderValidation;

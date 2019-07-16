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
    let { price_offered } = req.body;
    console.log("Validate order",req.body)
    if (!price_offered) {
      return res.status(404).json({
        error: 'Please offer price is required',
      });
    }
    if (price_offered) {
      // price_offered = price_offered.trim();
      if (!/^\d+$/.test(price_offered)) {
        return res.status(406).json({
          message: 'price offered should be numbers only',
        });
      }
    }

    req.body.price_offered = price_offered;
    next();
  }
}
export default OrderValidation;

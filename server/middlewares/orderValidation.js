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
    let { price } = req.body;
    console.log("Validate order",req.body)
    if (!price) {
      return res.status(404).json({
        error: 'Please offer price is required',
      });
    }
    if (price) {
      // price = price.trim();
      if (!/^\d+$/.test(price)) {
        return res.status(406).json({
          message: 'price offered should be numbers only',
        });
      }
    }

    req.body.price = price;
    next();
  }
}
export default OrderValidation;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
    let {
      priceOffered
    } = req.body;

    if (!priceOffered) {
      return res.status(404).json({
        error: 'Please offer price is required'
      });
    }

    if (priceOffered) {
      priceOffered = priceOffered.trim();

      if (!/^\d+$/.test(priceOffered)) {
        return res.status(406).json({
          message: 'price offered should be numbers only'
        });
      }
    }

    req.body.priceOffered = priceOffered;
    next();
  }

}

var _default = OrderValidation;
exports.default = _default;
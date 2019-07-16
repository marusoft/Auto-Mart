"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _connection = _interopRequireDefault(require("../db/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */

/**
 * @class Orders
 */
class Orders {
  /** Create a purchase order.
   * @static
   * @returns {object} CreateAPurchaseOrder.
   * @params {object} req
   * @params {object} res
   */
  static async CreateAPurchaseOrder(req, res) {
    const {
      user_id
    } = req.user;
    const {
      car_id,
      priceOffered
    } = req.body;
    const value = Number(car_id);
    const carSql = 'SELECT * FROM cars WHERE id = $1';

    try {
      const {
        rows,
        rowCount
      } = await _connection.default.query(carSql, [value]);

      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Cannot find the specify car.'
        });
      }

      const amount = rows[0].price;
      const orderSql = `INSERT INTO orders(buyer_id, car_id, priceOffered) VALUES($1, $2, $3)
    RETURNING *`;
      const values = [user_id, car_id, priceOffered];
      const purchaseOrder = await _connection.default.query(orderSql, values);
      const {
        order_id,
        createdon,
        status,
        priceoffered
      } = purchaseOrder.rows[0];
      const newPurchaseOrder = {
        order_id,
        car_id,
        createdon,
        status,
        amount,
        priceoffered
      };
      return res.status(201).json({
        status: 201,
        data: {
          newPurchaseOrder
        },
        message: 'Purchase Order Successfully created'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
  /** Update the price of a purchase order.
   * @static
   * @returns {object} updatePurchaseOrderPrice.
   * @params {object} req
   * @params {object} res
   */
  // eslint-disable-next-line consistent-return


  static async updatePurchaseOrderPrice(req, res) {
    const {
      newPriceOffered
    } = req.body;

    if (!newPriceOffered.trim() === '' || !/^\d+$/.test(newPriceOffered)) {
      return res.status(400).json({
        status: 400,
        error: 'input offer price can only be numbers'
      });
    }

    const {
      orderId
    } = req.params;
    const val = Number(orderId);
    let oldPriceOffered;

    try {
      const findOrder = 'SELECT * FROM orders WHERE order_id = $1';
      const {
        rows,
        rowCount
      } = await _connection.default.query(findOrder, [val]);

      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Purchase order not found'
        });
      }

      const previousPrice = rows[0].amount;

      if (rowCount !== 0 && rows[0].status !== 'pending') {
        return res.status(422).json({
          status: 422,
          error: 'Oosh, this order is no longer pending'
        });
      }

      if (rowCount !== 0 && rows[0].status === 'pending') {
        const updateNewPrice = 'UPDATE orders SET priceOffered = $1 WHERE order_id  = $2 RETURNING * ';
        const value = [newPriceOffered, val];
        const updateOrder = await _connection.default.query(updateNewPrice, value);

        if (updateOrder.rowCount !== 0) {
          const {
            order_id,
            car_id,
            status
          } = updateOrder.rows[0];
          oldPriceOffered = previousPrice;
          const updatePurchaseOrder = {
            order_id,
            car_id,
            status,
            oldPriceOffered,
            newPriceOffered
          };
          return res.status(200).json({
            status: 200,
            data: updatePurchaseOrder
          });
        }
      }
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  }

}

var _default = Orders;
exports.default = _default;
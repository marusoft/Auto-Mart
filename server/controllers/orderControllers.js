/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import pool from '../db/connection';

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
    const userid = req.user.id;
    // const { car_id } = req.body;
    const value = Number(req.body.car_id);

    const carSql = 'SELECT * FROM cars WHERE id = $1';

    try {
      const { rows, rowCount } = await pool.query(carSql, [value]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Cannot find the specify car.',
        });
      }
      const { price } = rows[0];
      const carId = rows[0].id;

      const orderSql = `INSERT INTO orders(buyer_id, car_id, amount) VALUES($1, $2, $3)
    RETURNING *`;
      const values = [userid, carId, req.body.amount];
      const purchaseOrder = await pool.query(orderSql, values);
      if (purchaseOrder.rowCount !== 0) {
        const {
          id,
          car_id,
          amount,
          status,
          created_on,
        } = purchaseOrder.rows[0];

        return res.status(201).json({
          status: 201,
          data: {
            id,
            car_id,
            created_on,
            status,
            amount,
            price,
          },
          message: 'Purchase Order Successfully created',
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
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
    const { price } = req.body;
    if (!price || !/^\d+$/.test(price)) {
      return res.status(400).json({
        status: 400,
        error: 'input offer price can only be numbers',
      });
    }
    const { orderId } = req.params;
    const val = Number(orderId);
    // const { id } = req.user.payload
    let old_price_offered;
    let new_price_offered;

    try {
      const findOrder = 'SELECT * FROM orders WHERE id = $1 and buyer_id = $2';
      const { rows, rowCount } = await pool.query(findOrder, [val, req.user.id]);
      old_price_offered = rows[0].amount;
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Purchase order not found',
        });
      }
      if (rowCount !== 0 && rows[0].status !== 'pending') {
        return res.status(422).json({
          status: 422,
          error: 'Oosh, this order is no longer pending',
        });
      }
      if (rowCount !== 0 && rows[0].status === 'pending') {
        const updateNewPrice = 'UPDATE orders SET amount = $1 WHERE id  = $2 and buyer_id = $3 RETURNING * ';
        const value = [price, val, req.user.id];
        const updateOrder = await pool.query(updateNewPrice, value);
        new_price_offered = price;
        if (updateOrder.rowCount !== 0) {
          const {
            id,
            car_id,
            status,
          } = updateOrder.rows[0];

          return res.status(200).json({
            status: 200,
            data: {
              id,
              car_id,
              status,
              old_price_offered,
              new_price_offered,
            },
          });
        }
      }
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }
}
export default Orders;


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
    console.log('val', req.body);
    const { car_id } = req.body;
    const value = Number(car_id);

    const carSql = 'SELECT * FROM cars WHERE id = $1';

    try {
      const { rows, rowCount } = await pool.query(carSql, [value]);
      console.log('Row order', rowCount);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Cannot find the specify car.',
        });
      }
      const amount = rows[0].price;

      const orderSql = `INSERT INTO orders(buyer_id, car_id, price_offered) VALUES($1, $2, $3)
    RETURNING *`;
      const values = [userid, value, req.body.price_offered];
      const purchaseOrder = await pool.query(orderSql, values);
      const {
        id,
        created_on,
        status,
        price_offered,
      } = purchaseOrder.rows[0];

      // const newPurchaseOrder = {
      //   id,
      //   car_id,
      //   created_on,
      //   status,
      //   amount,
      //   price_offered,
      // };
      return res.status(201).json({
        status: 201,
        data: {
          id,
          car_id,
          created_on,
          status,
          amount,
          price_offered,
        },
        message: 'Purchase Order Successfully created',
      });
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
    let old_price_offered;
    let new_price_offered;

    try {
      const findOrder = 'SELECT * FROM orders WHERE id = $1';
      const { rows, rowCount } = await pool.query(findOrder, [val]);
      old_price_offered = rows[0].price_offered;
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
        const updateNewPrice = 'UPDATE orders SET price_offered = $1 WHERE id  = $2 RETURNING * ';
        const value = [price, val];
        const updateOrder = await pool.query(updateNewPrice, value);
        new_price_offered = price;
        if (updateOrder.rowCount !== 0) {
          const {
            id,
            car_id,
            status,
          } = updateOrder.rows[0];
          // const updatePurchaseOrder = {
          //   id,
          //   car_id,
          //   status,
          //   old_price_offered,
          //   new_price_offered,
          // };
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
        error: error.message,
      });
    }
  }
}
export default Orders;

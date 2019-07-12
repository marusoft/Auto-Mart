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
    // eslint-disable-next-line camelcase
    const { user_id } = req.user;
    // eslint-disable-next-line camelcase
    const { car_id, priceOffered } = req.body;
    const sql = `INSERT INTO orders(buyer_id, car_id, priceOffered) VALUES($1, $2, $3)
    RETURNING *`;
    // eslint-disable-next-line camelcase
    const values = [user_id, car_id, priceOffered];
    try {
      const { rows } = await pool.query(sql, values);
      const newPurchaseOrder = rows[0];
      return res.status(201).json({
        status: 201,
        data: {
          newPurchaseOrder,
        },
        message: 'Purchase Order Successfully created',
      });
    } catch (error) {
      return res.status(400).json({
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
  static updatePurchaseOrderPrice(req, res) {
    const { newPurchasePrice } = req.body;
    if (!newPurchasePrice.trim() === '' || !/^\d+$/.test(newPurchasePrice)) {
      return res.status(400).json({
        status: 400,
        error: 'input price can only be numbers',
      });
    }

    let oldPurchasePrice; let id; let carId; let status;

    const { orderId } = req.params;
    const { email } = req.user;
    const findUser = users.find(user => user.email === email);
    const userId = findUser.id;
    const findOrderToUpdatePrice = orders
      .find(order => order.id === Number(orderId) && order.buyerId === userId);
    if (!findOrderToUpdatePrice) {
      return res.status(404).json({
        status: 404,
        message: 'Order cannot be found',
      });
    }
    if (findOrderToUpdatePrice && findOrderToUpdatePrice.status === 'pending') {
      oldPurchasePrice = findOrderToUpdatePrice.amount;

      // eslint-disable-next-line prefer-destructuring
      id = findOrderToUpdatePrice.id;
      // eslint-disable-next-line prefer-destructuring
      carId = findOrderToUpdatePrice.carId;
      // eslint-disable-next-line prefer-destructuring
      status = findOrderToUpdatePrice.status;

      const updatePurchaseOrder = {
        id,
        carId,
        status,
        oldPurchasePrice,
        newPurchasePrice,
      };
      return res.status(200).json({
        status: 200,
        data: updatePurchaseOrder,
      });
    }
    return res.status(422).json({
      status: 422,
      message: 'Ooosh, Order is no longer pending',
    });
  }
}
export default Orders;

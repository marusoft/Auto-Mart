
import orders from '../models/orderModels';
import cars from '../models/carModels';
import users from '../models/usersModels';

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
  static CreateAPurchaseOrder(req, res) {
    const { priceOffered, carId, status = 'pending' } = req.body;
    const id = orders[orders.length - 1].id + 1;
    const createdOn = new Date();

    const findCar = cars.find(car => car.id === Number(carId));
    if (!findCar) {
      res.status(404).json({
        status: 404,
        error: 'Car cannot be found',
      });
    }

    const carIndexValue = findCar.id;
    const { price } = findCar;

    const newPurchaseOrder = {
      id,
      carIndexValue,
      createdOn,
      status,
      price,
      priceOffered,
    };
    orders.push(newPurchaseOrder);
    return res.status(201).json({
      status: 201,
      data: {
        newPurchaseOrder,
      },
    });
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
        error: 'input price can only numbers',
      });
    }

    let oldPurchasePrice; let id; let carId; let status;

    const { orderId } = req.params;
    const { email } = req.body;
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
      message: 'Ooosh, order is no longer pending',
    });
  }
}
export default Orders;

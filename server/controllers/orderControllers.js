
import orders from '../models/orderModels';
import cars from '../models/carModels';
// import users from '../models/usersModels';

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
}
export default Orders;

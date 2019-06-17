import cars from '../models/carModels';

/**
 * @class Cars
 */

class Cars {
  /** Create a car sale AD.
   * @static
   * @returns {object} createCarSaleAD
   * @params {object} req
   * @params {object} res
   */
  static createCarSaleAD(req, res) {
    const {
      status = 'available',
      state = 'new',
      price,
      manufacturer,
      model,
      bodyType,
      carImageUrl,
    } = req.body;
    const id = cars[cars.length - 1].id + 1;
    const owner = req.body.id;
    const createdOn = new Date();
    const newCreatedCarAD = {
      id,
      owner,
      createdOn,
      manufacturer,
      model,
      price,
      state,
      status,
      bodyType,
      carImageUrl,
    };
    cars.push(newCreatedCarAD);
    return res.status(201).json({
      status: 201,
      data: {
        newCreatedCarAD,
      },
    });
  }

  /** View all posted ADs whether sold or available.
   * @static
   * @returns {object} ViewAllPostedAD
   * @params {object} req
   * @params {object} res
   */
  static ViewAllPostedAD(req, res) {
    res.status(200).json({
      status: 200,
      data: cars,
      message: 'All cars seen',
    });
  }

  /**  View a specific car.
   * @static
   * @returns {object} ViewASpecificCar
   * @params {object} req
   * @params {object} res
   */
  static ViewASpecificCar(req, res) {
    const { id } = req.params;
    const findSpecificCar = cars.find(car => car.id === parseInt(id, 10));
    if (!findSpecificCar) {
      return res.status(404).json({
        status: 404,
        error: 'Cannot find the specify car',
      });
    }
    return res.status(200).json({
      status: 200,
      data: findSpecificCar,
      message: 'Specify car seen',
    });
  }

  /**  Delete a specific car AD.
   * @static
   * @returns {object} deleteASpecificCarAD
   * @params {object} req
   * @params {object} res
   */
  static deleteASpecificCarAD(req, res) {
    const { findSpecificCar } = req.body;
    cars.splice(findSpecificCar, 1);
    return res.status(200).json({
      status: 200,
      data: 'Car Ad successfully deleted',
    });
  }
}
export default Cars;

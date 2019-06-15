import cars from '../models/carModels';

/**
 * @class Cars
 */

class Cars {
  /** Create a car sale ad.
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

  /** View all posted ads whether sold or available.
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
}
export default Cars;

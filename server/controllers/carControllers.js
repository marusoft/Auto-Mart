import cars from '../models/carModels';

/**
 * @class Cars
 */

class Cars {
  /**
   * @static
   * @returns {object} createCarSaleAD
   * @params {object} req
   * @params {object} res
   */
  static createCarSaleAD(req, res) {
    const {
      state = 'new',
      status = 'available',
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
}
export default Cars;

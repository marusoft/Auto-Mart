import cars from '../models/carModels';

/**
 * Car Validation
 * @class CarsValidation
 */

class CarsValidation {
/**
   * @returns {object} validateCarsDetails
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static validateCarsDetails(req, res, next) {
    let {
      state = 'new',
      status = 'available',
      price,
      manufacturer,
      model,
      bodyType,
      // eslint-disable-next-line prefer-const
      carImageUrl,
    } = req.body;
    if (state === undefined) {
      return res.status(404).json({
        message: 'please specify the state of the car',
      });
    }
    if (state) {
      state = state.trim();
      if (state.toLowerCase() !== 'new' && state.toLowerCase() !== 'used') {
        return res.status(400).json({
          message: 'Car state can either be new or used',
        });
      }
    }

    if (status === undefined) {
      return res.status(404).json({
        message: 'please specify the status of the car',
      });
    }
    if (status) {
      status = status.trim();
      if (status.toLowerCase() !== 'available' && status.toLowerCase() !== 'sold') {
        return res.status(400).json({
          message: 'Car status can either be available or sold',
        });
      }
    }

    if (price === undefined) {
      return res.status(406).json({
        message: 'Please specify car price',
      });
    }
    if (price) {
      price = price.trim();
      if (!/^\d+$/.test(price)) {
        return res.status(406).json({
          message: 'Only numbers are acceptable as Price',
        });
      }
    }
    if (manufacturer === undefined) {
      return res.status(404).json({
        message: 'please specify the manufacturer of the car',
      });
    }
    if (manufacturer) {
      manufacturer = manufacturer.trim();
      if (/[^a-zA-Z]/.test(manufacturer)) {
        return res.status(406).json({
          message: 'Only Alphabets input are acceptable',
        });
      }
    }
    if (model === undefined) {
      return res.status(404).json({
        message: 'please specify the Vehicle model',
      });
    }
    if (model) {
      model = model.trim();
      if (/[^a-zA-Z]/.test(model)) {
        return res.status(406).json({
          message: 'Only Alphabets input are acceptable',
        });
      }
    }
    if (bodyType === undefined) {
      return res.status(404).json({
        message: 'please specify the bodyType of the car',
      });
    }
    if (bodyType) {
      bodyType = bodyType.trim();
      if (/[^a-zA-Z]/.test(bodyType)) {
        return res.status(406).json({
          message: 'Only Alphabets input are acceptable',
        });
      }
    }
    if (carImageUrl === undefined) {
      return res.status(404).json({
        message: 'Please upload an image for this vehicle',
      });
    }
    req.body.state = state.toLowerCase().trim();
    req.body.status = status.toLowerCase().trim();
    req.body.price = price;
    req.body.manufacturer = manufacturer.toLowerCase();
    req.body.model = model.toLowerCase();
    req.body.bodyType = bodyType.toLowerCase();
    return next();
  }

  /**  View a specific car.
   * @static
   * @returns {object} validateSpecifyCar
   * @params {object} req
   * @params {object} res
   */
  static validateSpecifyCar(req, res, next) {
    const { id } = req.params;
    const findSpecificCar = cars.find(car => car.id === parseInt(id, 10));
    if (!findSpecificCar) {
      return res.status(404).json({
        status: 404,
        error: 'Cannot find the specify car',
      });
    }
    req.body.findSpecificCar = findSpecificCar;
    return next();
  }
}
export default CarsValidation;

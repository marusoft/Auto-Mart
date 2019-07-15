/* eslint-disable camelcase */
import pool from '../db/connection';
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
      state,
      status,
      price,
      manufacturer,
      model,
      body_type,
      // eslint-disable-next-line prefer-const
      img_url,
    } = req.body;
    if (!state) {
      return res.status(400).json({
        message: 'please specify the state of the car.',
      });
    }
    if (state) {
      state = state.trim();
      if (state.toLowerCase() !== 'new' && state.toLowerCase() !== 'used') {
        return res.status(400).json({
          message: 'Car state can either be new or used.',
        });
      }
    }

    if (!status) {
      return res.status(400).json({
        message: 'please specify the status of the car.',
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

    if (!price) {
      return res.status(400).json({
        message: 'Please specify car price.',
      });
    }
    if (price) {
      price = price.trim();
      if (!/^\d+$/.test(price)) {
        return res.status(406).json({
          message: 'Only numbers are acceptable as Price.',
        });
      }
    }
    if (!manufacturer) {
      return res.status(400).json({
        message: 'please specify the manufacturer of the car.',
      });
    }
    if (manufacturer) {
      manufacturer = manufacturer.trim();
      if (/[^a-zA-Z ]/.test(manufacturer)) {
        return res.status(406).json({
          message: 'Only Alphabets input characters are acceptable for manufacturer.',
        });
      }
    }
    if (!model) {
      return res.status(400).json({
        message: 'please specify the Vehicle model.',
      });
    }
    if (model) {
      model = model.trim();
      if (/[^a-zA-Z]/.test(model)) {
        return res.status(406).json({
          message: 'Only Alphabets input characters are acceptable for models.',
        });
      }
    }
    if (!body_type) {
      return res.status(400).json({
        message: 'please specify the bodyType of the car.',
      });
    }
    if (body_type) {
      body_type = body_type.trim();
      if (/[^a-zA-Z]/.test(body_type)) {
        return res.status(406).json({
          message: 'Only Alphabets input characters are acceptable for body type.',
        });
      }
    }
    if (!img_url) {
      return res.status(400).json({
        message: 'Please upload an image for this vehicle.',
      });
    }
    req.body.state = state.toLowerCase().trim();
    req.body.status = status.toLowerCase().trim();
    req.body.price = price;
    req.body.manufacturer = manufacturer.toLowerCase();
    req.body.model = model.toLowerCase();
    req.body.body_type = body_type.toLowerCase();
    return next();
  }

  /**  View a specific car.
   * @static
   * @returns {object} validateSpecifyCar
   * @params {object} req
   * @params {object} res
   */
  static async validateSpecifyCar(req, res, next) {
    const { id } = req.params;
    const value = Number(id);
    const findCar = 'SELECT * FROM cars WHERE id = $1';
    const findSpecificCar = await pool.query(findCar, [value]);
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

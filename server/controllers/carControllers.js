import moment from 'moment';
import cars from '../models/carModels';
import pool from '../db/connection';
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
  static async createCarSaleAD(req, res) {
    // eslint-disable-next-line camelcase
    const { user_id } = req.user;
    const {
      status,
      state,
      price,
      manufacturer,
      model,
      bodyType,
      carImgUrl,
    } = req.body;
    const createdOn = moment(new Date());
    const sql = `INSERT INTO cars(owner_id, createdOn, state, status, price, manufacturer, model, bodyType, carImgUrl)  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`;
    // eslint-disable-next-line camelcase
    const values = [user_id, createdOn, state, status, price, manufacturer, model, bodyType,
      carImgUrl];

    try {
      const { rows } = await pool.query(sql, values);
      const newCarAD = rows[0];
      return res.status(201).json({
        status: 201,
        data: {
          newCarAD,
        },
        message: 'Car Advert Successfully created',
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  /**  View a specific car.
   * @static
   * @returns {object} ViewASpecificCar
   * @params {object} req
   * @params {object} res
   */
  static async ViewASpecificCar(req, res) {
    const { id } = req.params;
    const sql = 'SELECT * FROM cars WHERE id = $1';
    const value = Number(id);
    try {
      const { rows } = await pool.query(sql, [value]);
      const findSpecificCar = rows[0];
      if (!findSpecificCar) {
        return res.status(404).json({
          status: 404,
          error: 'Cannot find the specify car.',
        });
      }
      return res.status(200).json({
        status: 200,
        data: findSpecificCar,
        message: 'Specify car seen.',
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  /**  Admin Delete a specific car AD.
   * @static
   * @returns {object} deleteASpecificCarAD
   * @params {object} req
   * @params {object} res
   */
  static async adminDeleteASpecificCarAD(req, res) {
    const { id } = req.params;
    const val = Number(id);
    const sql = 'DELETE FROM cars WHERE id = $1';
    try {
      const { rowCount } = await pool.query(sql, [val]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          message: 'No Car AD to delete',
        });
      }
      return res.status(200).json({
        status: 200,
        data: 'Car Ad successfully deleted',
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  /** Update the price of a car.
   * @static
   * @returns {object} updateCarPrice
   * @params {object} req
   * @params {object} res
   */
  static updateCarPrice(req, res) {
    const { id } = req.params;
    let { price } = req.body;
    const findSpecificCar = cars.find(car => car.id === parseInt(id, 10));
    if (!price) {
      return res.status(400).json({
        status: 400,
        error: 'add new price...',
      });
    }
    if (price) {
      price = price.trim();
      if (!/^\d+$/.test(price)) {
        return res.status(400).json({
          status: 400,
          error: 'Only numbers are acceptable for price input',
        });
      }
    }
    findSpecificCar.price = price;
    return res.status(200).json({
      status: 200,
      data: findSpecificCar,
    });
  }

  /** View all posted ADs whether sold or available.
   * @static
   * @returns {object} ViewAllPostedAD
   * @params {object} req
   * @params {object} res
   */
  static ViewAllUnsoldCars(req, res, next) {
    let {
      // eslint-disable-next-line prefer-const
      status, state, manufacturer, bodyType, minPrice, maxPrice,
    } = req.query;

    if (status && state) {
      const carsByStatusState = cars
        .filter(car => car
          .status === status && car
          .state === state);
      return res
        .status(200)
        .json({
          status: 200,
          data: carsByStatusState,
        });
    }
    if (state && manufacturer) {
      const carsByManufacturer = cars
        .filter(car => car
          .state === state && car
          .manufacturer === manufacturer);
      return res
        .status(200)
        .json({
          status: 200,
          data: carsByManufacturer,
        });
    }
    if (status && manufacturer) {
      const carsByManufacturer = cars
        .filter(car => car
          .status === status && car
          .manufacturer === manufacturer);
      return res
        .status(200)
        .json({
          status: 200,
          data: carsByManufacturer,
        });
    }
    if (status) {
      const carsByStatus = cars
        .filter(car => car
          .status === status);
      return res
        .status(200)
        .json({
          status: 200,
          data: carsByStatus,
        });
    }
    if (bodyType) {
      const type = cars
        .filter(car => car
          .bodyType === bodyType);
      return res.status(200).json({
        status: 200,
        data: type,
      });
    }
    if (req.query.status) {
      status = status.trim().toLowerCase();
      if (status && !minPrice && !maxPrice) {
        const findCarBystatus = cars.filter(car => car.status === status);
        if (findCarBystatus.length === 0) {
          return res.status(404).json({
            status: 404,
            error: 'Sorry, this does not exist',
          });
        }
        return res.status(200).json({
          status: 200,
          data: {
            findCarBystatus,
          },
        });
      }
      if (status && minPrice && maxPrice) {
        minPrice = Number(minPrice.trim());
        maxPrice = Number(maxPrice.trim());
        const findCarsByPriceRange = cars
          .filter(car => car.status === status && Number(car.price) >= minPrice
        && Number(car.price) <= maxPrice);
        if (findCarsByPriceRange.length === 0) {
          return res.status(404).json({
            status: 404,
            error: 'There is no result for your search now',
          });
        }
        return res.status(200).json({
          status: 200,
          data: {
            findCarsByPriceRange,
          },
        });
      }
    }
    next();
    return res.status(404).json({
      status: 404,
      error: 'There seems to be an issue with your search',
    });
  }

  /**  View All Posted AD Car
   * @static ViewAllPostedADCar
   * @returns {object}
   * @params {object} req
   * @params {object} res
   */
  static ViewAllPostedADCar(req, res) {
    return res.status(200).json({
      status: 200,
      data: cars,
      message: 'Success',
    });
  }
}

export default Cars;

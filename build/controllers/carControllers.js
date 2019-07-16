"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _connection = _interopRequireDefault(require("../db/connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    const {
      user_id
    } = req.user;
    const {
      status,
      state,
      price,
      manufacturer,
      model,
      bodyType,
      carImgUrl
    } = req.body;
    const createdOn = (0, _moment.default)(new Date());
    const sql = `INSERT INTO cars(owner_id, createdOn, state, status, price, manufacturer, model, bodyType, carImgUrl)  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`; // eslint-disable-next-line camelcase

    const values = [user_id, createdOn, state, status, price, manufacturer, model, bodyType, carImgUrl];

    try {
      const {
        rows
      } = await _connection.default.query(sql, values);
      const newCarAD = rows[0];
      return res.status(201).json({
        status: 201,
        data: {
          newCarAD
        },
        message: 'Car Advert Successfully created'
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message
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
    const {
      id
    } = req.params;
    const sql = 'SELECT * FROM cars WHERE id = $1';
    const value = Number(id);

    try {
      const {
        rows
      } = await _connection.default.query(sql, [value]);
      const findSpecificCar = rows[0];

      if (!findSpecificCar) {
        return res.status(404).json({
          status: 404,
          error: 'Cannot find the specify car.'
        });
      }

      return res.status(200).json({
        status: 200,
        data: findSpecificCar,
        message: 'Specify car seen.'
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message
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
    const {
      id
    } = req.params;
    const val = Number(id);
    const sql = 'DELETE FROM cars WHERE id = $1';

    try {
      const {
        rowCount
      } = await _connection.default.query(sql, [val]);

      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          message: 'No Car AD to delete'
        });
      }

      return res.status(200).json({
        status: 200,
        data: 'Car Ad successfully deleted'
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  }
  /**  Mark a posted car Ad as sold.
   * @static
   * @returns {object} updateCarStatus
   * @params {object} req
   * @params {object} res
   */


  static async updateCarStatus(req, res) {
    const {
      id
    } = req.params;
    let result;
    const val = Number(id);
    const checkCarStatus = 'SELECT * FROM cars WHERE id = $1';

    try {
      result = await _connection.default.query(checkCarStatus, [val]);

      if (result.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Car id not found'
        });
      }

      if (result.rows[0].status === 'sold') {
        return res.status(302).json({
          status: 302,
          error: 'Status is already mark as sold'
        });
      }

      const markCarAsSoldSql = 'UPDATE cars SET status = $1 WHERE id = $2 RETURNING *';
      const value = ['sold', result.rows[0].id];
      const {
        rows
      } = await _connection.default.query(markCarAsSoldSql, value);
      const statusUpdate = rows[0];
      return res.status(200).json({
        status: 200,
        data: statusUpdate
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  }
  /** Update the price of a car.
   * @static
   * @returns {object} updateCarPrice
   * @params {object} req
   * @params {object} res
   */


  static async updateCarPrice(req, res) {
    const {
      id
    } = req.params;
    const val = Number(id);
    let {
      price
    } = req.body;
    const findACar = 'SELECT * FROM cars WHERE id = $1';
    const updateFoundCar = 'UPDATE cars SET price = $1 WHERE id = $2 RETURNING *';
    const values = [price, val];

    try {
      const {
        rows
      } = await _connection.default.query(findACar, [val]);

      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'No Car to Update Price'
        });
      }

      if (!price) {
        return res.status(400).json({
          status: 400,
          error: 'add new price...'
        });
      }

      if (price) {
        price = price.trim();

        if (!/^\d+$/.test(price)) {
          return res.status(400).json({
            status: 400,
            error: 'Only numbers are acceptable for price input'
          });
        }
      }

      const result = await _connection.default.query(updateFoundCar, values);
      const updateFoundCarPrice = result.rows[0];
      return res.status(200).json({
        status: 200,
        data: updateFoundCarPrice
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  }
  /** View all unsold cars of specific make,state
   * status,manufacturer, body type and price range.
   * @static
   * @returns {object} ViewAllPostedAD
   * @params {object} req
   * @params {object} res
   */


  static async ViewAllUnsoldCars(req, res, next) {
    let {
      // eslint-disable-next-line prefer-const
      status,
      state,
      manufacturer,
      bodyType
    } = req.query;
    const carsByStatusStateNew = 'SELECT * FROM cars WHERE status = $1 AND state = $2';

    if (status && state === 'new') {
      try {
        const values = ['available', 'new'];
        const foundCarByStatusNew = await _connection.default.query(carsByStatusStateNew, values);
        return res.status(200).json({
          status: 200,
          data: foundCarByStatusNew.rows
        });
      } catch (error) {
        return res.status(400).json({
          error: error.message
        });
      }
    }

    const carsByStatusStateAndUsed = 'SELECT * FROM cars WHERE status = $1 AND state = $2';

    if (status && state === 'used') {
      try {
        const values = ['available', 'used'];
        const foundCarByStatusStateUsed = await _connection.default.query(carsByStatusStateAndUsed, values);
        return res.status(200).json({
          status: 200,
          data: foundCarByStatusStateUsed.rows
        });
      } catch (error) {
        return res.status(400).json({
          error: error.message
        });
      }
    }

    if (state && manufacturer) {
      const carsByStateManufacturer = 'SELECT * FROM cars WHERE state = $1 AND manufacturer = $2';

      try {
        const values = ['used', manufacturer];
        const foundCarByStateManufacturer = await _connection.default.query(carsByStateManufacturer, values);
        return res.status(200).json({
          status: 200,
          data: foundCarByStateManufacturer.rows
        });
      } catch (error) {
        return res.status(400).json({
          error: error.message
        });
      }
    }

    if (status && manufacturer) {
      const carsByStatusManufacturer = 'SELECT * FROM cars WHERE status = $1 AND manufacturer = $2';

      try {
        const values = ['available', manufacturer];
        const foundCarByStatusManufacturer = await _connection.default.query(carsByStatusManufacturer, values);
        return res.status(200).json({
          status: 200,
          data: foundCarByStatusManufacturer.rows
        });
      } catch (error) {
        return res.status(400).json({
          error: error.message
        });
      }
    }

    if (status) {
      const carsByStatus = 'SELECT * FROM cars WHERE status = $1';

      try {
        const value = ['available'];
        const foundCarByStatus = await _connection.default.query(carsByStatus, value);
        return res.status(200).json({
          status: 200,
          data: foundCarByStatus.rows
        });
      } catch (error) {
        return res.status(400).json({
          error: error.message
        });
      }
    }

    if (bodyType) {
      const carsByBodyType = 'SELECT * FROM cars WHERE bodytype = $1';

      try {
        const value = [bodyType];
        const foundCarByBodyType = await _connection.default.query(carsByBodyType, value);
        return res.status(200).json({
          status: 200,
          data: foundCarByBodyType.rows
        });
      } catch (error) {
        return res.status(400).json({
          error: error.message
        });
      }
    }

    return next();
  }
  /** View all unsold cars
   * within a price range.
   * @static ViewAllUnsoldCarsPriceRange
   * @returns {object}
   * @params {object} req
   * @params {object} res
   */


  static async ViewAllUnsoldCarsPriceRange(req, res) {
    const {
      minPrice,
      maxPrice
    } = req.query;
    const findPriceRange = `SELECT * FROM cars WHERE status = 'available' AND price BETWEEN '${minPrice}' AND '${maxPrice}' `;

    try {
      const {
        rows
      } = await _connection.default.query(findPriceRange);
      return res.status(200).json({
        status: 200,
        data: {
          rows
        }
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  }
  /** Admin View All Posted AD Car
   * sold or unsold
   * @static AdminViewAllPostedADCar
   * @returns {object}
   * @params {object} req
   * @params {object} res
   */


  static async AdminViewAllPostedADCar(req, res) {
    const allCars = 'SELECT * FROM cars';

    try {
      const {
        rows
      } = await _connection.default.query(allCars);
      return res.status(200).json({
        status: 200,
        data: rows,
        message: 'Success'
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message
      });
    }
  }

}

var _default = Cars;
exports.default = _default;
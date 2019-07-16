/* eslint-disable no-shadow */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable camelcase */
import moment from 'moment';
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
    const { id } = req.user;

    // const created_on = moment(new Date());
    const sql = `INSERT INTO cars(owner_id, state, price, manufacturer, model, body_type, img_url)  VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;
    // eslint-disable-next-line camelcase
    const values = [id, req.body.state, req.body.price, req.body.manufacturer, req.body.model, req.body.body_type,
      req.body.img_url];

    try {
      const { rows } = await pool.query(sql, values);
      const {
        id,
        owner_id,
        created_on,
        status,
        state,
        price,
        manufacturer,
        model,
        body_type,
        img_url,
      } = rows[0];
      console.log("Rows me",rows)
      return res.status(201).json({
        status: 201,
        data: {
          model,
          id,
          owner_id,
          created_on,
          status,
          state,
          price,
          manufacturer,
          body_type,
          img_url,
        },
        message: 'Car Advert Successfully created',
      });
    } catch (error) {
      console.log('error', error);
      return res.status(500).json({
        status: 500,
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
    const findOneCarSql = 'SELECT * FROM cars WHERE id = $1';
    const value = Number(id);
    try {
      const { rows } = await pool.query(findOneCarSql, [value]);
      const {
        id,
        owner_id,
        created_on,
        status,
        state,
        price,
        manufacturer,
        model,
        body_type,
        img_url,
      } = rows[0];
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Cannot find the specify car.',
        });
      }
      return res.status(200).json({
        status: 200,
        // data: findSpecificCar,
        data: {
          id,
          owner_id,
          created_on,
          status,
          state,
          price,
          manufacturer,
          model,
          body_type,
          img_url,
        },
        message: 'Specify car seen.',
      });
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({
        error,
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
    const deleteSql = 'DELETE FROM cars WHERE id = $1';
    try {
      const { rowCount } = await pool.query(deleteSql, [val]);
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
      console.log('error', error);
      return res.status(400).json({
        error: error.message,
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
    const { id } = req.params;
    let result;
    const val = Number(id);
    const checkCarStatus = 'SELECT * FROM cars WHERE id = $1';
    try {
      result = await pool.query(checkCarStatus, [val]);
      if (result.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Car id not found',
        });
      }

      if (result.rows[0].status === 'sold') {
        return res.status(302).json({
          status: 302,
          error: 'Status is already mark as sold',
        });
      }
      const markCarAsSoldSql = 'UPDATE cars SET status = $1 WHERE id = $2 RETURNING *';
      const value = ['sold', result.rows[0].id];

      const { rows } = await pool.query(markCarAsSoldSql, value);
      const {
        id,
        owner_id,
        created_on,
        status,
        state,
        price,
        manufacturer,
        model,
        body_type,
        img_url,
      } = rows[0];
      // const statusUpdate = rows[0];
      return res.status(200).json({
        status: 200,
        data: {
          id,
          owner_id,
          created_on,
          status,
          state,
          price,
          manufacturer,
          model,
          body_type,
          img_url,

        },
      });
    } catch (error) {
      console.log('error', error);
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
  static async updateCarPrice(req, res) {
    const { id } = req.params;
    const val = Number(id);
    let { price } = req.body;
    const findACar = 'SELECT * FROM cars WHERE id = $1';
    const updateFoundCar = 'UPDATE cars SET price = $1 WHERE id = $2 RETURNING *';
    const values = [price, val];
    try {
      const result = await pool.query(findACar, [val]);
      if (result.rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'No Car to Update Price',
        });
      }
      if (!price) {
        return res.status(400).json({
          status: 400,
          error: 'add new price...',
        });
      }
      if (price) {
        // price = price.trim();
        if (!/^\d+$/.test(price)) {
          return res.status(400).json({
            status: 400,
            error: 'Only numbers are acceptable for price input',
          });
        }
      }
      const { rows } = await pool.query(updateFoundCar, values);
      return res.status(200).json({
        status: 200,
        data: rows[0],

      });
    } catch (error) {
      console.log('error', error);
      return res.status(400).json({
        error: error.message,
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

      status, state, manufacturer, body_type,
    } = req.query;
    const carsByStatusStateNew = 'SELECT * FROM cars WHERE status = $1 AND state = $2';
    if (status && state === 'new') {
      try {
        const values = ['available', 'new'];
        const foundCarByStatusNew = await pool.query(carsByStatusStateNew, values);
        return res
          .status(200)
          .json({
            status: 200,
            data: foundCarByStatusNew.rows,
          });
      } catch (error) {
        console.log('error', error);
        return res.status(400).json({
          error: error.message,
        });
      }
    }
    const carsByStatusStateAndUsed = 'SELECT * FROM cars WHERE status = $1 AND state = $2';
    if (status && state === 'used') {
      try {
        const values = ['available', 'used'];
        const foundCarByStatusStateUsed = await pool.query(carsByStatusStateAndUsed, values);
        return res
          .status(200)
          .json({
            status: 200,
            data: foundCarByStatusStateUsed.rows,
          });
      } catch (error) {
        console.log('error', error);
        return res.status(400).json({
          error: error.message,
        });
      }
    }
    if (state && manufacturer) {
      const carsByStateManufacturer = 'SELECT * FROM cars WHERE state = $1 AND manufacturer = $2';
      try {
        const values = ['used', manufacturer];
        const foundCarByStateManufacturer = await pool.query(carsByStateManufacturer, values);
        return res
          .status(200)
          .json({
            status: 200,
            data: foundCarByStateManufacturer.rows,
          });
      } catch (error) {
        console.log('error', error);
        return res.status(400).json({
          error: error.message,
        });
      }
    }
    if (status && manufacturer) {
      const carsByStatusManufacturer = 'SELECT * FROM cars WHERE status = $1 AND manufacturer = $2';
      try {
        const values = ['available', manufacturer];
        const foundCarByStatusManufacturer = await pool.query(carsByStatusManufacturer, values);
        return res
          .status(200)
          .json({
            status: 200,
            data: foundCarByStatusManufacturer.rows,
          });
      } catch (error) {
        console.log('error', error);
        return res.status(400).json({
          error: error.message,
        });
      }
    }
    if (status) {
      const carsByStatus = 'SELECT * FROM cars WHERE status = $1';
      try {
        const value = ['available'];
        const foundCarByStatus = await pool.query(carsByStatus, value);
        return res.status(200).json({
          status: 200,
          data: foundCarByStatus.rows,
        });
      } catch (error) {
        console.log('error', error);
        return res.status(400).json({
          error: error.message,
        });
      }
    }
    if (body_type) {
      const carsByBodyType = 'SELECT * FROM cars WHERE body_type = $1';
      try {
        const value = [body_type];
        const foundCarByBodyType = await pool.query(carsByBodyType, value);
        return res
          .status(200)
          .json({
            status: 200,
            data: foundCarByBodyType.rows,
          });
      } catch (error) {
        console.log('error', error);
        return res.status(400).json({
          error: error.message,
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
  static async ViewAllUnsoldCarsPriceRange(req, res, next) {
    const { min_price, max_price } = req.query;
    if (min_price && max_price) {
      const findPriceRange = `SELECT * FROM cars WHERE status = 'available' AND price BETWEEN '${min_price}' AND '${max_price}' `;
      try {
        const { rows } = await pool.query(findPriceRange);
        return res.status(200).json({
          status: 200,
          data: {
            rows,
          },
        });
      } catch (error) {
        console.log('error', error);
        return res.status(400).json({
          error: error.message,
        });
      }
    }
    return next();
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
      const { rows } = await pool.query(allCars);
      return res.status(200).json({
        status: 200,
        data: rows,
        message: 'Success',
      });
    } catch (error) {
      console.log('error', error);
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

export default Cars;

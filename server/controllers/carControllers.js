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
      message: 'Car Advert Successfully created',
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

  /**  Mark a posted car Ad as sold.
   * @static
   * @returns {object} updateCarStatus
   * @params {object} req
   * @params {object} res
   */
  static updateCarStatus(req, res) {
    const id = Number(req.params.id);
    const findCarId = cars.find(car => car.id === id);
    if (!findCarId) {
      return res.status(404).json({
        status: 404,
        error: 'Invalid car id',
      });
    }
    if (findCarId.status === 'sold') {
      return res.status(302).json({
        status: 302,
        message: 'Car is already mark as Sold',
      });
    }
    findCarId.status = 'sold';
    return res.status(200).json({
      status: 200,
      data: findCarId,
    });
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
  static ViewAllPostedADCar(req, res) {
    const {
      status, state, manufacturer, bodyType,
    } = req.query;

    if (status) {
      const carsByStatus = cars.filter(car => car.status === status);
      return res.status(200).json({
        status: 200,
        data: [...carsByStatus],
      });
    }
    if (bodyType) {
      const carsByType = cars.filter(car => car.bodyType === bodyType);
      return res.status(200).json({
        status: 200,
        data: [...carsByType],
      });
    }
    if (status && manufacturer) {
      // eslint-disable-next-line max-len
      const carsByManufacturer = cars.filter(car => car.status === status && car.manufacturer === manufacturer);
      return res.status(200).json({
        status: 200,
        data: [...carsByManufacturer],
      });
    }
    if (state && manufacturer) {
      // eslint-disable-next-line max-len
      const carsByManufacturer = cars.filter(car => car.state === state && car.manufacturer === manufacturer);
      return res.status(200).json({
        status: 200,
        data: [...carsByManufacturer],
      });
    }
    if (status && state) {
      const carsByStatusState = cars.filter(car => car.status === status && car.state === state);
      return res.status(200).json({
        status: 200,
        data: [...carsByStatusState],
      });
    }

    return res.status(200).json({
      status: 200,
      data: [...cars],
      message: 'Success',
    });
  }
}

export default Cars;

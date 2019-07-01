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
      state,
      price,
      manufacturer,
      model,
      bodyType,
      carImageUrl,
    } = req.body;
    const id = cars[cars.length - 1].id + 1;
    // const owner = req.user.payload.id;
    const owner = req.user.id;
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
    const findSpecificCar = cars.find(car => car.id === Number(id));
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
  }

  /**  Delete a specific car AD.
   * @static
   * @returns {object} deleteASpecificCarAD
   * @params {object} req
   * @params {object} res
   */
  static deleteASpecificCarAD(req, res) {
    const { findSpecificCar } = req.body;
    console.log('delete');
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
    const { id } = req.params;
    const val = Number(id);
    const findCarId = cars.find(car => car.id === val);
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
        console.log('status', findCarBystatus);
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

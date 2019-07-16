import express from 'express';
import Cars from '../controllers/carControllers';
import CarsValidation from '../middlewares/carsValidation';
import UserAuthentication from '../middlewares/authUser';


const carRouter = express.Router();

carRouter.post(
  '/car', UserAuthentication.verifyUser,
  CarsValidation.validateCarsDetails,
  Cars.createCarSaleAD,
);

carRouter.get(
  '/car/:id', UserAuthentication.verifyUser,
  CarsValidation.validateSpecifyCar,
  Cars.ViewASpecificCar,
);

carRouter.delete('/car/:id',
  CarsValidation.validateSpecifyCar,
  Cars.adminDeleteASpecificCarAD);

carRouter.patch(
  '/car/:id/status',
  UserAuthentication.verifyUser,
  /* UserAuthentication.isOwner, */
  Cars.updateCarStatus,
);

carRouter.patch(
  '/car/:id/price',
  UserAuthentication.verifyUser,
  UserAuthentication.isOwner,
  Cars.updateCarPrice,
);
carRouter.get(
  '/car',
  Cars.ViewAllUnsoldCarsPriceRange,
  Cars.ViewAllUnsoldCars,
  Cars.AdminViewAllPostedADCar,
);


export default carRouter;

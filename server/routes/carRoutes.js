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
carRouter.delete(
  '/car/:id', UserAuthentication.verifyAdmin,
  CarsValidation.validateSpecifyCar,
  Cars.deleteASpecificCarAD,
);
carRouter.patch(
  '/car/:id/status',
  UserAuthentication.verifyUser,
  Cars.updateCarStatus,
);
carRouter.patch(
  '/car/:id/price',
  UserAuthentication.verifyUser,
  Cars.updateCarPrice,
);
carRouter.get(
  '/car', Cars.ViewAllUnsoldCars,
  UserAuthentication.verifyAdmin,
  Cars.ViewAllPostedADCar,
);


export default carRouter;

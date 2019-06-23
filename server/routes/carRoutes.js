import express from 'express';
import Cars from '../controllers/carControllers';
import CarsValidation from '../middlewares/carsValidation';
import UserAuthentication from '../middlewares/authUser';
// import { isCarOwner, isAdminUser } from '../ownerAdminAuth.js';


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
  '/car', UserAuthentication.verifyAdmin,
  Cars.ViewAllPostedADCar,
);
carRouter.get(
  '/car?status=available', UserAuthentication.verifyUser,
  Cars.ViewAllPostedADCar,
);
carRouter.get(
  '/car?status=available&state=new', UserAuthentication.verifyUser,
  Cars.ViewAllPostedADCar,
);
carRouter.get(
  '/car?status=available&state=used', UserAuthentication.verifyUser,
  Cars.ViewAllPostedADCar,
);
carRouter.get(
  '/car?status=available&manufacturer=manufacturer', UserAuthentication.verifyUser,
  Cars.ViewAllPostedADCar,
);
carRouter.get(
  '/car?bodyType=bodyType', UserAuthentication.verifyUser,
  Cars.ViewAllPostedADCar,
);


export default carRouter;

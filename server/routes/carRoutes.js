import express from 'express';
import Cars from '../controllers/carControllers';
import CarsValidation from '../middlewares/carsValidation';
// import { isCarOwner, isAdminUser } from '../ownerAdminAuth.js';


const carRouter = express.Router();

carRouter.post('/car', CarsValidation.validateCarsDetails, Cars.createCarSaleAD);
carRouter.get('/car/:id', CarsValidation.validateSpecifyCar, Cars.ViewASpecificCar);
carRouter.delete('/car/:id', CarsValidation.validateSpecifyCar, Cars.deleteASpecificCarAD);
carRouter.patch('/car/:id/status', Cars.updateCarStatus);
carRouter.patch('/car/:id/price', Cars.updateCarPrice);
carRouter.get('/car', Cars.ViewAllPostedADCar);


export default carRouter;

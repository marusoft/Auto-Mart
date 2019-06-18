import express from 'express';
import Cars from '../controllers/carControllers';
import CarsValidation from '../middlewares/carsValidation';
import { isCarOwner, isAdminUser } from '../ownerAdminAuth.js';


const carRouter = express.Router();

carRouter.post('/car', CarsValidation.validateCarsDetails, Cars.createCarSaleAD);
carRouter.get('/car', Cars.ViewAllPostedAD);
carRouter.get('/car/:id', CarsValidation.validateSpecifyCar, Cars.ViewASpecificCar);
carRouter.delete('/car/:id', isAdminUser, CarsValidation.validateSpecifyCar, Cars.deleteASpecificCarAD);
carRouter.patch('/car/:id/status', isCarOwner, Cars.updateCarStatus);

export default carRouter;

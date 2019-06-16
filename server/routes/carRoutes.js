import express from 'express';
import Cars from '../controllers/carControllers';
import CarsValidation from '../middlewares/carsValidation';


const carRouter = express.Router();

carRouter.post('/car', CarsValidation.validateCarsDetails, Cars.createCarSaleAD);
carRouter.get('/car', Cars.ViewAllPostedAD);
carRouter.get('/car/:id', CarsValidation.validateSpecifyCar, Cars.ViewASpecificCar);

export default carRouter;

import express from 'express';
import Cars from '../controllers/carControllers';

const carRouter = express.Router();

carRouter.post('/car', Cars.createCarSaleAD);

export default carRouter;

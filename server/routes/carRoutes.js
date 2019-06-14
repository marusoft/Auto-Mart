import express from 'express';
import Cars from '../controllers/carControllers';

const router = express.Router;

router.post('/car/', Cars.createCarSaleAD);

export default router;

import express from 'express';
import Orders from '../controllers/orderControllers';


const orderRouter = express.Router();


orderRouter.post('/order', Orders.CreateAPurchaseOrder);
orderRouter.patch('order/:id/price', Orders.updatePurchaseOrderPrice);

export default orderRouter;

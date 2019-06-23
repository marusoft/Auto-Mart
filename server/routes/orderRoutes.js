import express from 'express';
import Orders from '../controllers/orderControllers';


const orderRouter = express.Router();


orderRouter.post('/order', Orders.CreateAPurchaseOrder);
orderRouter.patch('/order/:orderId/price', Orders.updatePurchaseOrderPrice);

export default orderRouter;

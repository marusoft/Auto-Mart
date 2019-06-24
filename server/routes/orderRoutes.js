import express from 'express';
import Orders from '../controllers/orderControllers';
import OrderValidation from '../middlewares/orderValidation';
import UserAuthentication from '../middlewares/authUser';


const orderRouter = express.Router();


orderRouter.post(
  '/order', UserAuthentication.verifyUser,
  OrderValidation.validateOrdersDetails,
  Orders.CreateAPurchaseOrder,
);
orderRouter.patch(
  '/order/:orderId/price', UserAuthentication.verifyUser,
  Orders.updatePurchaseOrderPrice,
);

export default orderRouter;

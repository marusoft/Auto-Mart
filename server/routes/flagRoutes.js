import express from 'express';
import Flag from '../controllers/flagController';
import FlagValidation from '../middlewares/flagValidation';
import UserAuthentication from '../middlewares/authUser';


const flagRouter = express.Router();

flagRouter.post(
  '/flag', UserAuthentication.verifyUser,
  FlagValidation.validateFlagDetails,
  Flag.flagPostedAdAsFraud,
);

export default flagRouter;

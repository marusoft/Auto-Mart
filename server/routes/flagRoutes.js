import express from 'express';
import Flag from '../controllers/flagController';
import UserAuthentication from '../middlewares/authUser';


const flagRouter = express.Router();

flagRouter.post('/flag', UserAuthentication.verifyUser, Flag.flagPostedAdAsFraud);

export default flagRouter;

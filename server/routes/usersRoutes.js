import express from 'express';
import Users from '../controllers/usersController';
import UsersValidation from '../middlewares/usersValidator';

const userRouter = express.Router();


userRouter.post('/auth/signup',
  UsersValidation.ValidateUserSignUpInput,
  Users.createUsers);
userRouter.post('/auth/signin',

  Users.loginUsers);

export default userRouter;

import express from 'express';
import Users from '../controllers/usersController';
import UsersValidation from '../middlewares/usersValidator';

const router = express.Router();


router.post('/auth/signup', UsersValidation.ValidateUserSignUpInput, Users.createUsers);
router.post('/auth/signin', UsersValidation.ValidateUserSignInInput, Users.loginUsers);

export default router;

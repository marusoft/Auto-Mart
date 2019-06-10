import express from 'express';
import Users from '../controllers/usersController';

const router = express.Router();


router.post('/auth/signup', Users.createUsers);
router.post('/auth/signin', Users.loginUsers);

export default router;

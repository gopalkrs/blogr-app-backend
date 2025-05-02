import express from 'express';
import  { createUserControllers,loginUserControllers, logoutUserControllers, updateUserControllers, userLoggedInControllers } from '../controllers/userControllers.js';
import userIsLogged from '../middlewares/userIsLogged.js';

const router = express.Router();

router.post('/create', createUserControllers);
router.post('/login', loginUserControllers);
router.patch('/logged', userIsLogged, updateUserControllers);
router.get('/logout', userIsLogged, logoutUserControllers);
router.get('/logged',userIsLogged, userLoggedInControllers);

export default router;

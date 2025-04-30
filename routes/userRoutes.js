import express from 'express';
import  { createUserControllers,loginUserControllers, logoutUserControllers, userLoggedInControllers } from '../controllers/userControllers.js';
import userIsLogged from '../middlewares/userIsLogged.js';

const router = express.Router();

router.post('/create', createUserControllers);
router.post('/login', loginUserControllers);
router.get('/logout', userIsLogged, logoutUserControllers);
router.get('/logged', userLoggedInControllers);

export default router;

import express from 'express';
import  { createUserControllers,loginUserControllers } from '../controllers/userControllers.js';

const router = express.Router();

router.post('/create', createUserControllers);
router.post('/login', loginUserControllers);

export default router;

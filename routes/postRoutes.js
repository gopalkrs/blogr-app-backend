import express from 'express';
import {createPostController, deleteAllPostsController, deletePostController, getPostsController} from '../controllers/postControllers.js';
import userExists from '../middlewares/userExists.js';

const router = express.Router();

router.post('/create', userExists, createPostController);
router.get('/:userId', userExists, getPostsController);
router.delete('/:userId/:postId', userExists, deletePostController);
router.delete('/:userId', userExists, deleteAllPostsController)

export default router;

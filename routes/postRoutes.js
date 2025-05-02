import express from 'express';
import {createPostController, deleteAllPostsController, deletePostController, getAllPostsController, getPostsController, getSinglePostController} from '../controllers/postControllers.js';
import userIsLogged from '../middlewares/userIsLogged.js';

const router = express.Router();

router.post('/create', userIsLogged, createPostController);
router.get('/', userIsLogged, getPostsController);
router.get('/all-posts', userIsLogged, getAllPostsController);
router.get('/:postId', userIsLogged, getSinglePostController);
router.delete('/:postId', userIsLogged, deletePostController);
router.delete('/:userId', userIsLogged, deleteAllPostsController)

export default router;

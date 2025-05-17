import express from 'express';
import {createPostController, deleteAllPostsController, deletePostController, getAllPostsController, getPostsController, getSinglePostController} from '../controllers/postControllers.js';
import userIsLogged from '../middlewares/userIsLogged.js';
import checkUserRole from '../middlewares/checkUserRole.js';

const router = express.Router();

router.post('/create', userIsLogged, checkUserRole, createPostController);
router.get('/', userIsLogged, getPostsController);
router.get('/all-posts', getAllPostsController);
router.get('/:postId', userIsLogged, getSinglePostController);
router.delete('/:postId', userIsLogged, checkUserRole, deletePostController);
router.delete('/:userId', userIsLogged, checkUserRole,  deleteAllPostsController)

export default router;

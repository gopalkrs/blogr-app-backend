import express from 'express';
import {createPostController, deleteAllPostsController, deletePostController, getAllPostsController, getPostsController, getSinglePostController, uploadImageController} from '../controllers/postControllers.js';
import userIsLogged from '../middlewares/userIsLogged.js';
import checkUserRole from '../middlewares/checkUserRole.js';
import multer from 'multer';
import AWS from 'aws-sdk'

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION
// });


router.post('/create', userIsLogged, checkUserRole, createPostController);
router.post('/upload', userIsLogged, upload.single('file'), uploadImageController);


router.get('/', userIsLogged, getPostsController);
router.get('/all-posts', getAllPostsController);


router.get('/:postId', userIsLogged, getSinglePostController);
router.delete('/:postId', userIsLogged, checkUserRole, deletePostController);
router.delete('/user/:userId', userIsLogged, checkUserRole,  deleteAllPostsController);


export default router;

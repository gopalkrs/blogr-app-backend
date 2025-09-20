import createPost from "../actions/post-actions/createPost.js";
import deleteAllPosts from "../actions/post-actions/deleteAllPosts.js";
import deleteposts from "../actions/post-actions/deletePost.js";
import getAllPosts from "../actions/post-actions/getAllPosts.js";
import getMostLikedPosts from "../actions/post-actions/getMostLikedPosts.js";
import getMostRecentPosts from "../actions/post-actions/getMostRecentPosts.js";
import getPostsById from "../actions/post-actions/getPostsById.js";
import getSinglePosts from "../actions/post-actions/getSinglePosts.js";
import uploadImage from "../actions/post-actions/uploadImage.js";

const createPostController = (req, res) => {
    return createPost(req, res);
}

const getPostsController = (req, res) => {
    return getPostsById(req, res);
}

const getSinglePostController = (req, res) => {
    return getSinglePosts(req, res);
}

const deletePostController = (req, res) => {
    return deleteposts(req, res);
}
const deleteAllPostsController = (req, res) => {
    return deleteAllPosts(req, res);
}

const getAllPostsController = (req, res) => {
    return getAllPosts(req, res);
}

const uploadImageController = (req, res) =>{
    return uploadImage(req, res);
}

const getMostLikedPostsController = (req, res) => {
    return getMostLikedPosts(req, res);
}

const getMostRecentPostsController = (req, res) => {
    return getMostRecentPosts(req, res);
}

export {createPostController, getMostRecentPostsController, getPostsController, deletePostController, deleteAllPostsController, getSinglePostController, getAllPostsController, uploadImageController, getMostLikedPostsController};
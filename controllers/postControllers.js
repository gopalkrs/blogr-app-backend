import createPost from "../actions/post-actions/createPost.js";
import deleteAllPosts from "../actions/post-actions/deleteAllPosts.js";
import deleteposts from "../actions/post-actions/deletePost.js";
import getPosts from "../actions/post-actions/getPosts.js";
import getSinglePosts from "../actions/post-actions/getSinglePosts.js";

const createPostController = (req, res) => {
    return createPost(req, res);
}

const getPostsController = (req, res) => {
    return getPosts(req, res);
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

export {createPostController, getPostsController, deletePostController, deleteAllPostsController, getSinglePostController};
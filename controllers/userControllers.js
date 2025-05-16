import createUser from "../actions/user-actions/createUser.js"
import getUser from "../actions/user-actions/getUser.js";
import loginUser from "../actions/user-actions/loginUser.js";
import logoutUser from "../actions/user-actions/logoutUser.js";
import updateUser from "../actions/user-actions/updateUser.js";

const createUserControllers = (req, res) => {
    return createUser(req, res);
}

const loginUserControllers = (req, res) => {
    return loginUser(req, res);
}
const logoutUserControllers = (req, res) => {
    logoutUser(req, res);
}

const userLoggedInControllers = (req, res) => {
    getUser(req, res);
}

const updateUserControllers = (req, res) => {
    updateUser(req, res);
}

export {createUserControllers, loginUserControllers, logoutUserControllers, userLoggedInControllers, updateUserControllers};
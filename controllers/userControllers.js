import createUser from "../actions/user-actions/createUser.js"
import loginUser from "../actions/user-actions/loginUser.js";

const createUserControllers = (req, res) => {
    return createUser(req, res);
}

const loginUserControllers = (req, res) => {
    return loginUser(req, res);
}

export {createUserControllers, loginUserControllers};
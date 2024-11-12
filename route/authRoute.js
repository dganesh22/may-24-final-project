const { registerUser, loginUser, logoutUser, verifyUserToken } = require('../controller/authController')
const authMiddleware = require('../middleware/authMiddleware')
const authRoute = require('express').Router()

// register route
authRoute.post(`/register`, registerUser)

// login route
authRoute.post(`/login`, loginUser)

// logout route
authRoute.get(`/logout`, logoutUser)

// verify user token
authRoute.get(`/verify/usertoken`, authMiddleware, verifyUserToken)

module.exports = authRoute
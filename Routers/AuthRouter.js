const express= require('express');
const { loginHandler, signupHandler, protectRouteMiddleware, profileHandler, forgetPasswordHandler, resetPasswordHandler, logoutController } = require('../controllers/AuthController');


const AuthRouter= express.Router();





AuthRouter
    .post("/login", loginHandler)
    .post("/signup", signupHandler)
    .get("/logout", logoutController)
    .get("/profile", protectRouteMiddleware, profileHandler)
    .patch("/forgetPassword", forgetPasswordHandler)
    .patch("/resetPassword", resetPasswordHandler)

   




module.exports = AuthRouter;
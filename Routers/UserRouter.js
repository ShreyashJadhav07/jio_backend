const express = require("express");
const { protectRouteMiddleware } = require("../controllers/AuthController");
const { getUserWishlist, getCurrentUser, addToWishlist } = require("../controllers/UserController");
const UserRouter = express.Router();


UserRouter.use(protectRouteMiddleware);
UserRouter.get("/wishlist", getUserWishlist);
UserRouter.get("/",getCurrentUser);
UserRouter.post("/wishlist", addToWishlist);


module.exports= UserRouter;




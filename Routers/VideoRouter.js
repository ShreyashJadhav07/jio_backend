const express = require("express");
const { getAllVideos } = require("../controllers/VideoController.js");
const VideoRouter = express.Router();


const { getVideoStream ,getThumbnail} = require("../controllers/VideoController.js");


VideoRouter.get("/", getAllVideos);
VideoRouter.get("/watch", getVideoStream);
VideoRouter.get("/thumbnail", getThumbnail);


module.exports = VideoRouter;
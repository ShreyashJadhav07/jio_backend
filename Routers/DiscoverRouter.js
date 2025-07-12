const express = require("express");
const { getNowPlaying, getTrending, getUpcoming, getTopRated } = require("../controllers/DiscoverController");




const DiscoverRouter = express.Router();

DiscoverRouter
    .get("/now-playing",getNowPlaying)
    .get("/trending",getTrending)
    .get("/upcoming",getUpcoming)
    .get("/top-rated",getTopRated)

module.exports = DiscoverRouter;
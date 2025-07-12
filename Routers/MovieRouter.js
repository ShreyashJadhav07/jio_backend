const express= require('express');
const { getActionMovies, getComedyMovies, getHorrorMovies, getRomanceMovies, getAnimeMovies, getMovieDetails } = require('../controllers/MovieController');



const MoviesRouter= express.Router();






MoviesRouter 
    .get("/action", getActionMovies)
    .get("/comedy", getComedyMovies)
    .get("/horror", getHorrorMovies)
    .get("/romance", getRomanceMovies)
    .get("/anime", getAnimeMovies)
    .get("/details", getMovieDetails)
  

   




module.exports = MoviesRouter;
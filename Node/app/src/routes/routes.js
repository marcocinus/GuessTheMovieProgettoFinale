import express from "express";

const API_ROOT = '/api';

import { getRandomMovie, saveMovieToDB, deleteMovieById, getUserMoviesById } from "../controllers/movie-controller.js"

const router = express.Router();

router.get(`${API_ROOT}/randomMovie`, getRandomMovie);
//router.get(`${API_ROOT}/randomMovie/:movieId`, getUpdatedMovie);
//router.patch(`${API_ROOT}/randomMovie/:movieId/comments/:userId`, updateMovieByMovieId);
router.post(`${API_ROOT}/saveMovie`, saveMovieToDB);
//router.post(`${API_ROOT}/updateMovie`, updateMovieByMovieId);
//router.get(`${API_ROOT}/movies`, getDataMoviesDb);

router.get(`${API_ROOT}/:userId/movies`, getUserMoviesById);
router.delete(`${API_ROOT}/movies/:movieId`, deleteMovieById);
export default router;

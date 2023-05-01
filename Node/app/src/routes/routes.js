import express from "express";

const API_ROOT = '/api';

import { getRandomMovie, saveMovieToDB, deleteMovieById, getUserMoviesById } from "../controllers/movie-controller.js"

const router = express.Router();

router.get(`${API_ROOT}/randomMovie`, getRandomMovie);
router.post(`${API_ROOT}/saveMovie`, saveMovieToDB);
router.get(`${API_ROOT}/:userId/movies`, getUserMoviesById);
router.delete(`${API_ROOT}/movies/:movieId`, deleteMovieById);
export default router;

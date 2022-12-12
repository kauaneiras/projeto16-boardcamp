import express from 'express';
import { postgamescontroller, getgamescontroller } from '../controllers/games.controller.js';
import { gamesmiddleware } from '../middlewares/games.middleware.js';

const gamesrouter = express.Router();

gamesrouter.post('/games', gamesmiddleware, postgamescontroller);

gamesrouter.get('/games', getgamescontroller);

export default gamesrouter;
import express from 'express';
import { postrentalcontroller, getrentalscontroller } from '../controllers/rentals.controller.js';
import { rentalsmiddleware } from '../middlewares/rentals.middleware.js';

const rentalsrouter = express.Router();

rentalsrouter.post('/rentals', rentalsmiddleware, postrentalcontroller);

// rentalsrouter.get('/rentals', controller);

export default rentalsrouter;
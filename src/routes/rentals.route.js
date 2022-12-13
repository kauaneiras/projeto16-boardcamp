import express from 'express';
import { postrentalcontroller, getrentalscontroller, postrentalreturncontroller, deleterentalcontroller } from '../controllers/rentals.controller.js';
import { rentalsmiddleware, rentalreturnmiddleware, deleterentalmiddleware } from '../middlewares/rentals.middleware.js';

const rentalsrouter = express.Router();

rentalsrouter.post('/rentals', rentalsmiddleware, postrentalcontroller); 
rentalsrouter.get('/rentals/', getrentalscontroller); 
rentalsrouter.post('/rentals/:id/return', rentalreturnmiddleware, postrentalreturncontroller) //return rental
rentalsrouter.delete('/rentals/:id', deleterentalmiddleware, deleterentalcontroller);

export default rentalsrouter;
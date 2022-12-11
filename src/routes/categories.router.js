import express from 'express';
import { postcategoriescontroller, getcategoriescontroller } from '../controllers/categories.controller.js';
import { categoriesmiddleware } from '../middlewares/categories.middleware.js';

const categoriesrouter = express.Router();

categoriesrouter.post('/categories', categoriesmiddleware, postcategoriescontroller);

categoriesrouter.get('/categories', getcategoriescontroller);

export default categoriesrouter;
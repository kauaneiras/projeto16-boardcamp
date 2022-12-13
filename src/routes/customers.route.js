import express from 'express';
import { postcustomerscontroller, getallcustomerscontroller, putcustomerscontroller, getonecustomercontroller } from '../controllers/customers.controller.js';
import { customersmiddleware } from "../middlewares/customers.middleware.js";

const customersrouter = express.Router();

customersrouter.post('/customers', customersmiddleware, postcustomerscontroller);
customersrouter.put('/customers/:id', customersmiddleware, putcustomerscontroller);
customersrouter.get('/customers', getallcustomerscontroller);
customersrouter.get('/customers/:id', getonecustomercontroller);

export default customersrouter;
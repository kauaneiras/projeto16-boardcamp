import express from 'express';
import { postcustomerscontroller, getallcustomerscontroller, putcustomerscontroller, getonecustomercontroller } from '../controllers/customers.controller.js';
import { customersmiddleware } from "../middlewares/customers.middleware.js";

const customersrouter = express.Router();

customersrouter.post('/costumers', customersmiddleware, postcustomerscontroller);
customersrouter.put('/costumers/:id', customersmiddleware, putcustomerscontroller);
customersrouter.get('/costumers', getallcustomerscontroller);
customersrouter.get('/costumers/:id', getonecustomercontroller);

export default customersrouter;
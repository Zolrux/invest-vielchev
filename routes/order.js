import express from 'express';
import { checkAuth } from '../middleware/index.js';
import { createOrder, updateOrder } from '../controllers/orderController.js';
import { body } from 'express-validator';
import checkRole from '../middleware/checkRole.js';

const orderRouter = express.Router();

orderRouter.post('/services/order', 
[
	function(req, res, next) {  
		res.locals.errors = [];
		next();
	},
	checkAuth,
	body('firstName').notEmpty().withMessage('* Введите имя'),
	body('email').isEmail().withMessage('* Введите корректный адрес электронной почты'),
	body('phone').notEmpty().withMessage('* Введите номер телефона').matches(/^(?:\+380|380|0)\d{9}$/).withMessage('* Введите корректный номер телефона'),
], createOrder);

orderRouter.put('/order', checkAuth, checkRole('admin'), updateOrder);

export default orderRouter;
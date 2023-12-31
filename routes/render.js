import express from 'express';
import { checkAuth } from '../middleware/index.js';
import { servicesController } from '../controllers/servicesController.js';
import { getOrders } from '../controllers/orderController.js';
const routerPages = express.Router();

routerPages.get('/', (req, res) => {
  res.render('../views/index');
});

routerPages.get('/login', (req, res) => {
  res.render('../views/login', {errors: false, fields: false});
});

routerPages.get('/registration', (req, res) => {
  res.render('../views/registration', {errors: false, fields: false});
});

routerPages.get('/services', checkAuth, servicesController, (req, res) => {
  res.render('../views/services', {
	isAuth: res.locals.isAuth,
	errors: [],
	role: res.locals.user.role,
	fields: res.locals.user, 
	categories: res.locals.categories});
});

routerPages.get('/orders', [
	checkAuth,
 	function(req, res, next) {
		if (!res.locals.isAuth) {
			return res.redirect('/login');
		}
		next();
 	}],
	 getOrders,
	 (req, res) => {
 	 res.render('../views/orders', {
		user: res.locals.user,
		orders: res.locals.orders 
	});
});

export default routerPages;

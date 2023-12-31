import express from 'express';
import { registerUser, loginUser, logout } from '../controllers/authController.js';
import {checkAuth, passwordValidator} from '../middleware/index.js';
import { body } from 'express-validator';

const authRouter = express.Router();

authRouter.post('/register', [
	function(req, res, next) {  
		res.locals.errors = [];
		next();
	},
	body('firstName').notEmpty().withMessage('* Введите имя'),
	body('lastName').notEmpty().withMessage('* Введите фамилию'),
	body('email').isEmail().withMessage('* Введите корректный адрес электронной почты'),
	body('phone').notEmpty().withMessage('* Введите номер телефона').matches(/^(?:\+380|380|0)\d{9}$/).withMessage('* Введите корректный номер телефона'),
	body('password').isLength({ min: 8 }).withMessage('* Пароль должен содержать минимум 8 символов'),
	passwordValidator,
	body('confirmPassword').custom((value, { req }) => {
	  if (value !== req.body.password) {
		 throw new Error('* Пароли не совпадают');
	  }
	  return true;
	}),
 ], registerUser);

 authRouter.post('/login', [
	function(req, res, next) {  
		res.locals.errors = [];
		next();
	},
	body('email').isEmail().withMessage('* Введите корректный адрес электронной почты'),
 ], loginUser);

 authRouter.get('/logout', checkAuth, logout);

 export default authRouter;
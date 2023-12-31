import {User, Category} from '../models/index.js';
import jwt from 'jsonwebtoken';

export const servicesController = async (req, res, next) => {
	try {
		if (!res.locals.isAuth) {
			res.locals.user = false;
			res.locals.categories = false;
			next();
			return;
		}

		const authToken = req.cookies['auth-token'];
		const {email} = jwt.decode(authToken);

		const user = await User.findOne({where: {email}});
		const categories = await Category.findAll();

		res.locals.user = user;
		res.locals.categories = [];

		categories.forEach(category => {
			res.locals.categories.push(category.dataValues.type);
		});

		next();
		
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Непредвиденная ошибка');
	}
 };
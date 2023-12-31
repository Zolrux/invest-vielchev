import { User, Order, Category } from '../models/index.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { formattedDate, getStatusClass } from '../utils/utils.js';


export const createOrder = async (req, res, next) => {
  try {
    if (!res.locals.isAuth) {
      return res.status(401).json({ message: 'Не авторизирован' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        res.locals.errors.push([error.msg]);
      });
    }

    const { firstName, phone, email, category: selectedCategory, message } = req.body;
    const authToken = req.cookies['auth-token'];
    const { role, email: userEmail } = jwt.decode(authToken);

    if (res.locals.errors.length > 0) {
      const categories = await Category.findAll();
      const renderCategories = [];

      categories.forEach((category) => {
        renderCategories.push(category.dataValues.type);
      });

      return res.render('../views/services', {
        isAuth: res.locals.isAuth,
        role,
        errors: res.locals.errors,
        fields: { firstName, email, phoneNumber: phone, message },
        categories: renderCategories,
      });
    }

    const user = await User.findOne({ where: { email: userEmail } });
    const category = await Category.findOne({ where: { type: selectedCategory } });
    const { id: user_id } = user.dataValues;
    const { id: category_id } = category.dataValues;

    await Order.create({
      name: firstName,
      phoneNumber: phone,
      email,
      message,
      user_id,
      category_id,
    });

    return res.redirect('/orders');
  } catch (error) {
    console.error(error);
    res.status(500).send('Непредвиденная ошибка');
  }
};

export const getOrders = async (req, res, next) => {
  try {
    if (!res.locals.isAuth) {
      return res.status(401).json({ message: 'Не авторизирован' });
    }

    const authToken = req.cookies['auth-token'];
    const { id, email, role } = jwt.decode(authToken);

    const user = await User.findOne({ where: { email } });

    res.locals.orders = [];
    res.locals.user = user.dataValues;
	 let orders = null;

    if (role === 'user') {
      orders = await Order.findAll({
        where: { user_id: id },
        include: {
          model: Category,
          attributes: ['type'],
        },
      });
	}

	if (role === 'admin') {
		orders = await Order.findAll({
			include: {
				model: Category,
				attributes: ['type'],
			 },
		});
	 }

	orders.forEach((order) => {

	  res.locals.orders.push({
		 ...order.dataValues,
		 category: order.Category.dataValues.type,
		 date: formattedDate(order.dataValues.createdAt),
		 statusClass: getStatusClass(order.dataValues.status),
	  });
	});

	// Переходим к функции для рендера страницы /orders
	next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Непредвиденная ошибка');
  }
};

export const updateOrder = async (req, res, next) => {
	
	const {orderId, statusText: status} = req.body;

	await Order.update({status}, {
		where: {
			id: orderId
		}
	})

	next();
	
}
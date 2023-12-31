import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { User } from '../models/index.js';
import { generateJWT, saveCookieUser } from '../utils/utils.js';


export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        res.locals.errors.push([error.msg]);
      });
    }

    const { firstName, lastName, email, phone, password, confirmPassword } = req.body;

    if (res.locals.errors.length > 0) {
      return res.render('../views/registration', {
        errors: res.locals.errors,
        fields: { firstName, lastName, email, phone, password, confirmPassword },
      });
    }

    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      return res.render('../views/registration', {
        errors: ['Пользователь с таким email уже зарегистрирован'],
        fields: { firstName, lastName, email, phone, password, confirmPassword },
      });
    }

    const hashPassword = await bcrypt.hash(password, 7);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      phoneNumber: phone,
    });

    const authToken = generateJWT({ id: user.id, firstName, email, role: user.role });
	 saveCookieUser(res, authToken)

    res.redirect('/');

  } catch (error) {
    console.error(error);
    res.status(500).send('Непредвиденная ошибка');
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach((error) => {
        res.locals.errors.push(error.msg);
      });
    }

    if (res.locals.errors.length > 0) {
      return res.render('../views/login', {
        errors: res.locals.errors,
        fields: { email, password },
      });
    }

    const candidate = await User.findOne({ where: { email } });
    if (!candidate) {
      return res.render('../views/login', {
        errors: ['Пользователь не найден'],
        fields: { email, password },
      });
    }

    const isValidPassword = await bcrypt.compare(password, candidate.password);

    if (!isValidPassword) {
      return res.render('../views/login', {
        errors: ['Не верно указан пароль'],
        fields: { email, password },
      });
    }

	 const authToken = generateJWT({ id: candidate.id, firstName: candidate.firstName, email, role: candidate.role });
	 saveCookieUser(res, authToken);

    res.redirect('/');

  } catch (error) {
    console.error(error);
    res.status(500).send('Непредвиденная ошибка');
  }
};

export const logout = async (req, res, next) => {
	if (!res.locals.isAuth) {
		return res.status(401).json({message: "Не авторизирован"});
	}

	return res.clearCookie('auth-token').redirect('/');
}
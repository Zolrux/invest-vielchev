import jwt from 'jsonwebtoken';

const checkAuth = async (req, res, next) => {
	const authToken = req.cookies['auth-token'];

	if (!authToken) {
		res.locals.isAuth = false;
		next();
		return;
	}

	const checkValidToken = jwt.verify(authToken, process.env.SECRET_KEY);

	if (!checkValidToken) {
		res.locals.isAuth = false;
		next();
		return;
	}

	res.locals.isAuth = true;
	next();
 };
 
 export default checkAuth;
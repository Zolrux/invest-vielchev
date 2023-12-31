import jwt from 'jsonwebtoken';

const checkRole = role => {
	// Замыкаем переменную role
	return async (req, res, next) => {
	
		if (!res.locals.isAuth) {
			return res.status(401).json({message: "Не авторизован"});
		}
		
		const authToken = req.cookies['auth-token'];
		const {role: userRole} = jwt.decode(authToken);
		
		if (userRole !== role) {
			return res.status(403).json({message: "Нет прав"});
		}
		
		next();
	 };
}
 
 export default checkRole;
import jwt from 'jsonwebtoken';


export const formattedDate = (date) => {
	const dateObject = new Date(date);

	const year = dateObject.getFullYear();
	const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
	const day = dateObject.getDate().toString().padStart(2, '0');

	return `${day}.${month}.${year}`;
}

export const getStatusClass = (status) => {
	const statusClasses = {
		'В обробці': '_in-proccess',
		'Виконано': '_done',
		'Відхилено': '_rejected',
	 };

	 return statusClasses[status];
}

export const generateJWT = (payload) => {
	return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
 };
 
export const saveCookieUser = (res, token) => {
	return res.cookie('auth-token', token, {
	  httpOnly: true,
	  maxAge: 3_600_000, // 1 hour
	});
 };
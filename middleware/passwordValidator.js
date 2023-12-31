const passwordValidator = (req, res, next) => {
  const { password } = req.body;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  if (!passwordRegex.test(password)) {
    res.locals.errors.push('* Пароль должен содержать минимум 8 символов, включая хотя бы одну цифру, одну строчную и одну заглавную букву');
  }

  next();
};

export default passwordValidator;
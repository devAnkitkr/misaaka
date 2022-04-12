import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.send('Token is not valid');
      } else {
        (req.user = decode), next();
      }
    });
  } else res.send('Token is not supplied');
};

export default isAuth;

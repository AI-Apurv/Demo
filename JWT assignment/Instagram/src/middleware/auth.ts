import jwt from 'jsonwebtoken';




const SECRET_KEY = 'secretKey'

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader;
    console.log(authHeader);
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      // console.log(user);
      
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export {authenticateToken};

const jwt = require('jsonwebtoken');
const { unauthorizedResponse } = require('../utils/commonUtils'); 

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return unauthorizedResponse(res, 'Token not provided');
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); 
    req.user = decoded.user;
    next();
  } catch (error) {
    return unauthorizedResponse(res, 'Invalid token');
  }
};

module.exports = { authenticateUser };

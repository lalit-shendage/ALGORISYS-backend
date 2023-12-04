const unauthorizedResponse = (res, message) => {
    return res.status(401).json({ message: `Unauthorized - ${message}` });
  };
  
  module.exports = { unauthorizedResponse };
  
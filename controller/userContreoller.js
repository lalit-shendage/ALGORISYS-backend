// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const { unauthorizedResponse, errorHandler } = require('../utils/commonUtils');

const UserController = {
  signup: async (req, res) => {
    try {
      const { username, password } = req.body;

      
      const hashedPassword = await bcrypt.hash(password, 10);

      const userData = { username, password: hashedPassword };
      await User.create(userData);

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.log(error)
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.getByUsername(username);
      if (!user) {
        return unauthorizedResponse(res, 'User not found');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return unauthorizedResponse(res, 'Incorrect password');
      }

      
      const token = jwt.sign({ user: { id: user.id, username: user.username } }, 'your_secret_key', {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (error) {
      errorHandler(res, error);
    }
  },

  getProfile: (req, res) => {
    
    const { id, username } = req.user;

    res.json({ id, username });
  },
  
};

module.exports = UserController;

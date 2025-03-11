const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth');

module.exports = (db) => {
  const userController = new UserController(db);

  // Rotas públicas
  router.post('/register', userController.register.bind(userController));
  router.post('/login', userController.login.bind(userController));

  // Rotas protegidas
  router.get('/profile', authMiddleware, userController.getProfile.bind(userController));
  router.put('/profile', authMiddleware, userController.updateProfile.bind(userController));
  router.delete('/account', authMiddleware, userController.deleteAccount.bind(userController));

  return router;
};
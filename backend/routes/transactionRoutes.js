const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

module.exports = (db) => {
  const transactionController = new TransactionController(db);

  // Rotas protegidas por autenticação
  router.post('/', authMiddleware, transactionController.createTransaction.bind(transactionController));
  router.get('/my', authMiddleware, transactionController.getUserTransactions.bind(transactionController));
  router.get('/:id', authMiddleware, transactionController.getTransactionById.bind(transactionController));
  router.patch('/:id/status', authMiddleware, transactionController.updateTransactionStatus.bind(transactionController));
  
  // Rota de estatísticas (apenas admin)
  router.get('/stats/overview', authMiddleware, transactionController.getTransactionStats.bind(transactionController));

  return router;
};
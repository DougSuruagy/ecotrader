const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middleware/auth');

module.exports = (db) => {
  const productController = new ProductController(db);

  // Rotas públicas
  router.get('/', productController.getProducts.bind(productController));
  router.get('/:id', productController.getProductById.bind(productController));
  router.get('/user/:userId', productController.getUserProducts.bind(productController));

  // Rotas protegidas
  router.post('/', authMiddleware, productController.createProduct.bind(productController));
  router.put('/:id', authMiddleware, productController.updateProduct.bind(productController));
  router.delete('/:id', authMiddleware, productController.deleteProduct.bind(productController));
  router.patch('/:id/status', authMiddleware, productController.toggleProductStatus.bind(productController));

  return router;
};
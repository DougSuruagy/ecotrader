const Product = require('../models/Product');
const { ObjectId } = require('mongodb');

class ProductController {
  constructor(db) {
    this.productModel = new Product(db);
  }

  async createProduct(req, res) {
    try {
      const productData = req.body;
      productData.userId = req.user.id; // Obtém o ID do usuário autenticado
      
      const newProduct = await this.productModel.create(productData);
      
      res.status(201).json({
        message: 'Produto criado com sucesso',
        product: newProduct
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
    }
  }

  async getProducts(req, res) {
    try {
      const { query, category, minPrice, maxPrice, condition, location, page = 1, limit = 20 } = req.query;
      
      const filters = {};
      if (category) filters.category = category;
      if (minPrice) filters.minPrice = minPrice;
      if (maxPrice) filters.maxPrice = maxPrice;
      if (condition) filters.condition = condition;
      if (location) filters.location = location;
      
      const result = await this.productModel.search(query, filters, parseInt(page), parseInt(limit));
      
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
    }
  }

  async getProductById(req, res) {
    try {
      const productId = req.params.id;
      const product = await this.productModel.findById(productId);
      
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      
      // Incrementar visualizações
      await this.productModel.incrementViews(productId);
      
      res.json({ product });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produto', error: error.message });
    }
  }

  async getUserProducts(req, res) {
    try {
      const userId = req.params.userId || req.user.id;
      const products = await this.productModel.findByUser(userId);
      
      res.json({ products });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar produtos do usuário', error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updateData = req.body;
      
      // Verificar se o produto existe e pertence ao usuário
      const product = await this.productModel.findById(productId);
      
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      
      if (product.userId.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Você não tem permissão para editar este produto' });
      }
      
      const success = await this.productModel.update(productId, updateData);
      
      if (!success) {
        return res.status(400).json({ message: 'Nenhuma alteração realizada' });
      }
      
      const updatedProduct = await this.productModel.findById(productId);
      
      res.json({
        message: 'Produto atualizado com sucesso',
        product: updatedProduct
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      
      // Verificar se o produto existe e pertence ao usuário
      const product = await this.productModel.findById(productId);
      
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      
      if (product.userId.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Você não tem permissão para excluir este produto' });
      }
      
      const success = await this.productModel.delete(productId);
      
      if (!success) {
        return res.status(400).json({ message: 'Erro ao excluir produto' });
      }
      
      res.json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir produto', error: error.message });
    }
  }

  async toggleProductStatus(req, res) {
    try {
      const productId = req.params.id;
      const { status } = req.body;
      
      if (!['active', 'inactive', 'sold'].includes(status)) {
        return res.status(400).json({ message: 'Status inválido' });
      }
      
      // Verificar se o produto existe e pertence ao usuário
      const product = await this.productModel.findById(productId);
      
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      
      if (product.userId.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Você não tem permissão para alterar este produto' });
      }
      
      await this.productModel.updateStatus(productId, status);
      
      res.json({ message: `Status do produto alterado para ${status}` });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao alterar status do produto', error: error.message });
    }
  }
}

module.exports = ProductController;
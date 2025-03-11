const Transaction = require('../models/Transaction');
const Product = require('../models/Product');
const User = require('../models/User');
const { ObjectId } = require('mongodb');

class TransactionController {
  constructor(db) {
    this.transactionModel = new Transaction(db);
    this.productModel = new Product(db);
    this.userModel = new User(db);
  }

  async createTransaction(req, res) {
    try {
      const { productId, paymentMethod } = req.body;
      const buyerId = req.user.id;

      // Verificar se o produto existe
      const product = await this.productModel.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }

      // Verificar se o produto está disponível
      if (product.status !== 'active' || product.quantity <= 0) {
        return res.status(400).json({ message: 'Produto não disponível para compra' });
      }

      // Verificar se o comprador não é o vendedor
      if (product.userId.toString() === buyerId) {
        return res.status(400).json({ message: 'Você não pode comprar seu próprio produto' });
      }

      // Criar a transação
      const transactionData = {
        productId,
        sellerId: product.userId,
        buyerId,
        amount: product.price,
        paymentMethod,
        status: 'pending'
      };

      const transaction = await this.transactionModel.create(transactionData);

      // Atualizar o status do produto para 'reserved'
      await this.productModel.update(productId, { status: 'reserved' });

      res.status(201).json({
        message: 'Transação iniciada com sucesso',
        transaction,
        platformFee: transaction.platformFee,
        sellerAmount: transaction.sellerAmount
      });
    } catch (error) {
      console.error('Erro ao criar transação:', error);
      res.status(500).json({ message: 'Erro ao processar transação', error: error.message });
    }
  }

  async getTransactionById(req, res) {
    try {
      const transactionId = req.params.id;
      const transaction = await this.transactionModel.findById(transactionId);

      if (!transaction) {
        return res.status(404).json({ message: 'Transação não encontrada' });
      }

      // Verificar se o usuário tem permissão para ver esta transação
      const userId = req.user.id;
      if (
        transaction.buyerId.toString() !== userId &&
        transaction.sellerId.toString() !== userId &&
        req.user.role !== 'admin'
      ) {
        return res.status(403).json({ message: 'Você não tem permissão para acessar esta transação' });
      }

      res.json({ transaction });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar transação', error: error.message });
    }
  }

  async getUserTransactions(req, res) {
    try {
      const userId = req.user.id;
      const { role = 'buyer' } = req.query;

      // Verificar se o papel é válido
      if (role !== 'buyer' && role !== 'seller') {
        return res.status(400).json({ message: 'Papel inválido. Use "buyer" ou "seller"' });
      }

      const transactions = await this.transactionModel.findByUser(userId, role);

      res.json({ transactions });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar transações', error: error.message });
    }
  }

  async updateTransactionStatus(req, res) {
    try {
      const transactionId = req.params.id;
      const { status, paymentDetails } = req.body;
      const userId = req.user.id;

      // Verificar se a transação existe
      const transaction = await this.transactionModel.findById(transactionId);
      if (!transaction) {
        return res.status(404).json({ message: 'Transação não encontrada' });
      }

      // Verificar permissões com base no status solicitado
      if (status === 'completed' || status === 'refunded') {
        // Apenas administradores podem marcar como concluído ou reembolsado
        if (req.user.role !== 'admin') {
          return res.status(403).json({ 
            message: 'Apenas administradores podem atualizar para este status' 
          });
        }
      } else if (status === 'cancelled') {
        // Apenas o comprador ou administrador pode cancelar
        if (transaction.buyerId.toString() !== userId && req.user.role !== 'admin') {
          return res.status(403).json({ 
            message: 'Você não tem permissão para cancelar esta transação' 
          });
        }
      }

      // Atualizar o status da transação
      const updated = await this.transactionModel.updateStatus(transactionId, status, paymentDetails);

      if (!updated) {
        return res.status(400).json({ message: 'Não foi possível atualizar a transação' });
      }

      // Atualizar o produto com base no novo status da transação
      if (status === 'completed') {
        // Marcar produto como vendido
        await this.productModel.update(transaction.productId, { status: 'sold' });
      } else if (status === 'cancelled' || status === 'refunded') {
        // Retornar produto para ativo
        await this.productModel.update(transaction.productId, { status: 'active' });
      }

      res.json({ 
        message: 'Status da transação atualizado com sucesso',
        status
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar transação', error: error.message });
    }
  }

  async getTransactionStats(req, res) {
    try {
      // Verificar se o usuário é administrador
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acesso negado. Apenas administradores podem ver estatísticas' });
      }

      const { period = 30 } = req.query;
      const stats = await this.transactionModel.getStats(parseInt(period));

      res.json({ stats });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar estatísticas', error: error.message });
    }
  }
}

module.exports = TransactionController;
const { ObjectId } = require('mongodb');

class Transaction {
  constructor(db) {
    this.collection = db.collection('transactions');
  }

  async create(transactionData) {
    const {
      productId,
      sellerId,
      buyerId,
      amount,
      paymentMethod,
      paymentIntentId,
      status = 'pending'
    } = transactionData;

    // Calcular a taxa da plataforma (5% do valor da transação)
    const platformFee = parseFloat((amount * 0.05).toFixed(2));
    const sellerAmount = parseFloat((amount - platformFee).toFixed(2));

    const newTransaction = {
      productId: new ObjectId(productId),
      sellerId: new ObjectId(sellerId),
      buyerId: new ObjectId(buyerId),
      originalAmount: amount,
      platformFee,
      sellerAmount,
      paymentMethod,
      paymentIntentId,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
      completedAt: null
    };

    const result = await this.collection.insertOne(newTransaction);
    return { ...newTransaction, _id: result.insertedId };
  }

  async findById(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findByUser(userId, role = 'buyer') {
    const query = {};
    if (role === 'buyer') {
      query.buyerId = new ObjectId(userId);
    } else if (role === 'seller') {
      query.sellerId = new ObjectId(userId);
    }

    return this.collection.find(query).sort({ createdAt: -1 }).toArray();
  }

  async findByProduct(productId) {
    return this.collection.find({ productId: new ObjectId(productId) }).toArray();
  }

  async updateStatus(id, status, paymentDetails = {}) {
    const updateData = {
      status,
      updatedAt: new Date(),
      ...paymentDetails
    };

    // Se o status for 'completed', adicionar a data de conclusão
    if (status === 'completed') {
      updateData.completedAt = new Date();
    }

    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return result.modifiedCount > 0;
  }

  async getStats(period = 30) {
    // Calcular a data de início com base no período (em dias)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - period);

    // Agregação para obter estatísticas de transações
    const stats = await this.collection.aggregate([
      {
        $match: {
          status: 'completed',
          completedAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalTransactions: { $sum: 1 },
          totalVolume: { $sum: '$originalAmount' },
          totalFees: { $sum: '$platformFee' },
          averageAmount: { $avg: '$originalAmount' }
        }
      }
    ]).toArray();

    return stats[0] || {
      totalTransactions: 0,
      totalVolume: 0,
      totalFees: 0,
      averageAmount: 0
    };
  }
}

module.exports = Transaction;
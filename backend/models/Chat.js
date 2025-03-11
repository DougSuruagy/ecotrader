const { ObjectId } = require('mongodb');

class Chat {
  constructor(db) {
    this.collection = db.collection('chats');
  }

  async create(chatData) {
    const { productId, participants, initialMessage } = chatData;
    
    const newChat = {
      productId: new ObjectId(productId),
      participants: participants.map(id => new ObjectId(id)),
      messages: initialMessage ? [{
        sender: new ObjectId(initialMessage.sender),
        content: initialMessage.content,
        timestamp: new Date(),
        read: false
      }] : [],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'active'
    };
    
    const result = await this.collection.insertOne(newChat);
    return { ...newChat, _id: result.insertedId };
  }

  async findById(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findByUser(userId) {
    return this.collection.find({
      participants: new ObjectId(userId)
    }).toArray();
  }

  async findByProduct(productId) {
    return this.collection.find({
      productId: new ObjectId(productId)
    }).toArray();
  }

  async findByParticipants(userId1, userId2, productId) {
    return this.collection.findOne({
      participants: { $all: [new ObjectId(userId1), new ObjectId(userId2)] },
      productId: new ObjectId(productId)
    });
  }

  async addMessage(chatId, messageData) {
    const { sender, content } = messageData;
    
    const message = {
      sender: new ObjectId(sender),
      content,
      timestamp: new Date(),
      read: false
    };
    
    const result = await this.collection.updateOne(
      { _id: new ObjectId(chatId) },
      { 
        $push: { messages: message },
        $set: { updatedAt: new Date() }
      }
    );
    
    return result.modifiedCount > 0;
  }

  async markAsRead(chatId, userId) {
    const result = await this.collection.updateOne(
      { 
        _id: new ObjectId(chatId),
        'messages.sender': { $ne: new ObjectId(userId) },
        'messages.read': false
      },
      { 
        $set: { 'messages.$[elem].read': true },
        $set: { updatedAt: new Date() }
      },
      {
        arrayFilters: [{ 'elem.read': false, 'elem.sender': { $ne: new ObjectId(userId) } }],
        multi: true
      }
    );
    
    return result.modifiedCount > 0;
  }

  async getUnreadCount(userId) {
    const pipeline = [
      { $match: { participants: new ObjectId(userId) } },
      { $unwind: '$messages' },
      { $match: { 
        'messages.sender': { $ne: new ObjectId(userId) },
        'messages.read': false
      }},
      { $count: 'total' }
    ];
    
    const result = await this.collection.aggregate(pipeline).toArray();
    return result.length > 0 ? result[0].total : 0;
  }
}

module.exports = Chat;
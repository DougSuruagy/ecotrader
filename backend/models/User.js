const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

class User {
  constructor(db) {
    this.collection = db.collection('users');
  }

  async create(userData) {
    const { name, email, password, location } = userData;
    
    // Verificar se o email já existe
    const existingUser = await this.collection.findOne({ email });
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }
    
    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = {
      name,
      email,
      password: hashedPassword,
      location,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      avatar: null,
      ratings: [],
      averageRating: 0,
      favorites: [],
      notifications: []
    };
    
    const result = await this.collection.insertOne(newUser);
    return { ...newUser, _id: result.insertedId, password: undefined };
  }

  async findById(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findByEmail(email) {
    return this.collection.findOne({ email });
  }

  async update(id, updateData) {
    const { password, ...data } = updateData;
    
    // Se houver atualização de senha, fazer hash
    if (password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(password, salt);
    }
    
    data.updatedAt = new Date();
    
    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    
    return result.modifiedCount > 0;
  }

  async delete(id) {
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  async validatePassword(storedPassword, providedPassword) {
    return bcrypt.compare(providedPassword, storedPassword);
  }
}

module.exports = User;
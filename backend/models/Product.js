const { ObjectId } = require('mongodb');

class Product {
  constructor(db) {
    this.collection = db.collection('products');
  }

  async create(productData) {
    const { title, description, category, price, quantity, condition, images, location, userId } = productData;
    
    const newProduct = {
      title,
      description,
      category,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      condition,
      images: images || [],
      location,
      userId: new ObjectId(userId),
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      favorites: 0,
      environmentalImpact: {
        co2Saved: 0,
        wasteReduced: 0
      }
    };
    
    const result = await this.collection.insertOne(newProduct);
    return { ...newProduct, _id: result.insertedId };
  }

  async findById(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findByUser(userId) {
    return this.collection.find({ userId: new ObjectId(userId) }).toArray();
  }

  async search(query, filters = {}, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    
    let searchQuery = {};
    
    // Texto de busca
    if (query) {
      searchQuery.$text = { $search: query };
    }
    
    // Filtros adicionais
    if (filters.category) {
      searchQuery.category = filters.category;
    }
    
    if (filters.minPrice || filters.maxPrice) {
      searchQuery.price = {};
      if (filters.minPrice) searchQuery.price.$gte = parseFloat(filters.minPrice);
      if (filters.maxPrice) searchQuery.price.$lte = parseFloat(filters.maxPrice);
    }
    
    if (filters.condition) {
      searchQuery.condition = filters.condition;
    }
    
    if (filters.location) {
      searchQuery.location = { $regex: filters.location, $options: 'i' };
    }
    
    // Status (por padrão, apenas produtos ativos)
    searchQuery.status = filters.status || 'active';
    
    const total = await this.collection.countDocuments(searchQuery);
    const products = await this.collection.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    return {
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async update(id, updateData) {
    const { ...data } = updateData;
    
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

  async incrementViews(id) {
    return this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { views: 1 } }
    );
  }

  async toggleFavorite(id, increment = true) {
    return this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $inc: { favorites: increment ? 1 : -1 } }
    );
  }

  async updateStatus(id, status) {
    return this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );
  }
}

module.exports = Product;
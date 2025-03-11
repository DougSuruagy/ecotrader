const { MongoClient } = require('mongodb');

// Configuração do MongoDB
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);
let db;

async function connectDB() {
  let retries = 5;
  while (retries) {
    try {
      await client.connect();
      console.log('Conectado ao MongoDB');
      
      db = client.db('ecotrader');
      
      // Inicialização das coleções
      await db.collection('users').createIndex({ email: 1 }, { unique: true });
      await db.collection('products').createIndex({ title: 'text', description: 'text' });
      await db.collection('chats').createIndex({ participants: 1, productId: 1 });
      
      return db;
    } catch (err) {
      console.error(`Erro na conexão com MongoDB (tentativas restantes: ${retries}):`, err);
      retries -= 1;
      await new Promise(res => setTimeout(res, 5000));
    }
  }
  throw new Error('Não foi possível conectar ao MongoDB após várias tentativas');
}

module.exports = { connectDB, client };
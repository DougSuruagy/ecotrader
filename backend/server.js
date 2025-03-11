const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const Joi = require('@hapi/joi');
const rateLimit = require('express-rate-limit');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

// Importar configuração do banco de dados
const { connectDB, client } = require('./config/database');

// Importar rotas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const chatRoutes = require('./routes/chatRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Verificar variáveis de ambiente críticas
if (!process.env.JWT_SECRET) {
  console.error('Falta variável de ambiente: JWT_SECRET');
  process.exit(1);
}

// Configuração inicial do Express
const app = express();
const server = http.createServer(app);

// Configuração do Socket.IO com CORS
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Configurações do Express
app.use(cors());
app.use(bodyParser.json());

// Middleware de autenticação JWT
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autenticação inválido' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};

// Middleware admin
const adminMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Acesso negado. Token ausente' });
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.role || decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Permissões insuficientes' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token de administrador inválido' });
  }
};

// Configuração do Stripe
let stripe;
try {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
} catch (error) {
  console.warn('Stripe não configurado:', error.message);
}

// Configuração do Socket.IO
io.on('connection', (socket) => {
  console.log('Novo cliente conectado:', socket.id);

  // Autenticação do socket
  socket.on('authenticate', (data) => {
    try {
      const decoded = jwt.verify(data.token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      socket.join(`user:${decoded.id}`);
      console.log(`Usuário ${decoded.id} autenticado no socket`);
    } catch (err) {
      socket.emit('auth_error', { message: 'Falha na autenticação do socket' });
    }
  });

  // Entrar em uma sala de chat
  socket.on('join_chat', ({ chatId }) => {
    if (socket.userId) {
      socket.join(`chat:${chatId}`);
      console.log(`Usuário ${socket.userId} entrou no chat ${chatId}`);
    }
  });

  // Sair de uma sala de chat
  socket.on('leave_chat', ({ chatId }) => {
    socket.leave(`chat:${chatId}`);
    console.log(`Usuário saiu do chat ${chatId}`);
  });

  // Digitando
  socket.on('typing', ({ chatId }) => {
    socket.to(`chat:${chatId}`).emit('typing', { userId: socket.userId, chatId });
  });

  // Desconexão
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Rotas de autenticação
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Muitas tentativas de login, tente novamente mais tarde'
});

app.post('/api/auth/login', loginLimiter, (req, res) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user || !bcryptjs.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  
  // Em uma implementação real, gerar um token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      location: user.location,
      avatar: user.avatar
    }
  });
});

app.post('/api/auth/register', (req, res) => {
  const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')).required(),
    location: Joi.string().max(100).required()
  });

  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Implementação do registro
});

// Rota de pagamentos
app.post('/api/payments/create-intent', authMiddleware, async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({ message: 'Serviço de pagamento não configurado' });
    }
    
    const { amount, currency } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency || 'BRL',
      metadata: {
        userId: req.headers.userid
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Erro no pagamento:', error);
    res.status(500).json({ message: 'Erro ao processar pagamento' });
  }
});

// Registrar rotas
async function registerRoutes() {
  const db = await connectDB();
  app.use('/api/users', userRoutes(db));
  app.use('/api/products', productRoutes(db));
  app.use('/api/chats', chatRoutes(db));
  app.use('/api/transactions', transactionRoutes(db));
}

// Middleware de erros - deve ser o último
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Ocorreu um erro inesperado',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Inicialização do servidor
async function startServer() {
  try {
    // Conectar ao banco de dados antes de iniciar o servidor
    await connectDB();
    
    // Registrar rotas
    await registerRoutes();
    
    // Iniciar o servidor HTTP
    const port = process.env.PORT || 5000;
    server.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

// Função para fechar conexões ao encerrar o servidor
async function closeServer() {
  try {
    await client.close();
    console.log('Conexão com o MongoDB fechada');
    server.close(() => {
      console.log('Servidor HTTP encerrado');
      process.exit(0);
    });
  } catch (error) {
    console.error('Erro ao encerrar o servidor:', error);
    process.exit(1);
  }
}

// Tratamento de sinais para encerramento gracioso
process.on('SIGTERM', closeServer);
process.on('SIGINT', closeServer);

// Iniciar o servidor
startServer();

// Exportar para testes
module.exports = { app, server, connectDB, closeServer };
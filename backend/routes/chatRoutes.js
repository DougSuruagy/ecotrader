const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/ChatController');
const authMiddleware = require('../middleware/auth');

module.exports = (db) => {
  const chatController = new ChatController(db);

  // Todas as rotas de chat requerem autenticação
  router.use(authMiddleware);
  
  // Criar um novo chat
  router.post('/', chatController.createChat.bind(chatController));
  
  // Obter todos os chats do usuário
  router.get('/', chatController.getUserChats.bind(chatController));
  
  // Obter um chat específico por ID
  router.get('/:id', chatController.getChatById.bind(chatController));
  
  // Enviar mensagem em um chat
  router.post('/:id/messages', chatController.sendMessage.bind(chatController));
  
  // Obter contagem de mensagens não lidas
  router.get('/unread/count', chatController.getUnreadCount.bind(chatController));

  return router;
};
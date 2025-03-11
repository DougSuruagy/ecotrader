const Chat = require('../models/Chat');
const { ObjectId } = require('mongodb');

class ChatController {
  constructor(db) {
    this.chatModel = new Chat(db);
  }

  async createChat(req, res) {
    try {
      const { productId, sellerId } = req.body;
      const buyerId = req.user.id;
      
      // Verificar se já existe um chat entre esses usuários para este produto
      const existingChat = await this.chatModel.findByParticipants(buyerId, sellerId, productId);
      
      if (existingChat) {
        return res.json({
          message: 'Chat já existe',
          chat: existingChat
        });
      }
      
      const chatData = {
        productId,
        participants: [buyerId, sellerId],
        initialMessage: req.body.initialMessage ? {
          sender: buyerId,
          content: req.body.initialMessage
        } : null
      };
      
      const newChat = await this.chatModel.create(chatData);
      
      res.status(201).json({
        message: 'Chat criado com sucesso',
        chat: newChat
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar chat', error: error.message });
    }
  }

  async getUserChats(req, res) {
    try {
      const userId = req.user.id;
      const chats = await this.chatModel.findByUser(userId);
      
      res.json({ chats });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar chats', error: error.message });
    }
  }

  async getChatById(req, res) {
    try {
      const chatId = req.params.id;
      const userId = req.user.id;
      
      const chat = await this.chatModel.findById(chatId);
      
      if (!chat) {
        return res.status(404).json({ message: 'Chat não encontrado' });
      }
      
      // Verificar se o usuário é participante do chat
      const isParticipant = chat.participants.some(p => p.toString() === userId);
      if (!isParticipant && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Você não tem permissão para acessar este chat' });
      }
      
      // Marcar mensagens como lidas
      await this.chatModel.markAsRead(chatId, userId);
      
      res.json({ chat });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar chat', error: error.message });
    }
  }

  async sendMessage(req, res) {
    try {
      const chatId = req.params.id;
      const userId = req.user.id;
      const { content } = req.body;
      
      if (!content || content.trim() === '') {
        return res.status(400).json({ message: 'Conteúdo da mensagem não pode estar vazio' });
      }
      
      const chat = await this.chatModel.findById(chatId);
      
      if (!chat) {
        return res.status(404).json({ message: 'Chat não encontrado' });
      }
      
      // Verificar se o usuário é participante do chat
      const isParticipant = chat.participants.some(p => p.toString() === userId);
      if (!isParticipant) {
        return res.status(403).json({ message: 'Você não tem permissão para enviar mensagens neste chat' });
      }
      
      const messageData = {
        sender: userId,
        content
      };
      
      const success = await this.chatModel.addMessage(chatId, messageData);
      
      if (!success) {
        return res.status(400).json({ message: 'Erro ao enviar mensagem' });
      }
      
      // Emitir evento via Socket.IO (será implementado na configuração do socket)
      
      res.json({ message: 'Mensagem enviada com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao enviar mensagem', error: error.message });
    }
  }

  async getUnreadCount(req, res) {
    try {
      const userId = req.user.id;
      const count = await this.chatModel.getUnreadCount(userId);
      
      res.json({ unreadCount: count });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar contagem de mensagens não lidas', error: error.message });
    }
  }
}

module.exports = ChatController;
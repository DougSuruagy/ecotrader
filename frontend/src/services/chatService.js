import api from './api';
import io from 'socket.io-client';

let socket;

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

const connectSocket = (token) => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      auth: {
        token
      }
    });
  }
  return socket;
};

const chatService = {
  // Conectar ao socket
  connect: () => {
    const token = localStorage.getItem('token');
    if (token) {
      return connectSocket(token);
    }
    return null;
  },

  // Desconectar do socket
  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },

  // Criar um novo chat
  createChat: async (productId, sellerId, initialMessage) => {
    return api.post('/chats', { productId, sellerId, initialMessage });
  },

  // Obter todos os chats do usuário
  getUserChats: async () => {
    return api.get('/chats');
  },

  // Obter um chat específico por ID
  getChatById: async (chatId) => {
    return api.get(`/chats/${chatId}`);
  },

  // Enviar mensagem em um chat
  sendMessage: async (chatId, content) => {
    return api.post(`/chats/${chatId}/messages`, { content });
  },

  // Obter contagem de mensagens não lidas
  getUnreadCount: async () => {
    return api.get('/chats/unread/count');
  },

  // Registrar ouvintes de eventos do socket
  onNewMessage: (callback) => {
    if (socket) {
      socket.on('new_message', callback);
    }
  },

  onMessageRead: (callback) => {
    if (socket) {
      socket.on('message_read', callback);
    }
  },

  // Emitir eventos para o socket
  emitJoinChat: (chatId) => {
    if (socket) {
      socket.emit('join_chat', { chatId });
    }
  },

  emitLeaveChat: (chatId) => {
    if (socket) {
      socket.emit('leave_chat', { chatId });
    }
  },

  emitTyping: (chatId) => {
    if (socket) {
      socket.emit('typing', { chatId });
    }
  },

  onTyping: (callback) => {
    if (socket) {
      socket.on('typing', callback);
    }
  }
};

export default chatService;
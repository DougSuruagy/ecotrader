import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 1.5rem;
  height: calc(100vh - 200px);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const ChatSidebar = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ChatSidebarHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--gray-light);
`;

const ChatSidebarTitle = styled.h2`
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
`;

const ChatSearch = styled.div`
  position: relative;
  
  input {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid var(--gray);
    border-radius: var(--border-radius);
    font-size: 0.9rem;
  }
`;

const ChatList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ChatItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--gray-light);
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${props => props.active ? 'var(--gray-light)' : 'transparent'};
  
  &:hover {
    background-color: var(--gray-light);
  }
`;

const ChatItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ChatItemName = styled.div`
  font-weight: 500;
  color: var(--text-color);
`;

const ChatItemTime = styled.div`
  font-size: 0.8rem;
  color: var(--text-light);
`;

const ChatItemLastMessage = styled.div`
  font-size: 0.9rem;
  color: var(--text-light);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatItemUnread = styled.div`
  display: ${props => props.unread ? 'block' : 'none'};
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--primary-color);
  margin-left: 0.5rem;
`;

const ChatMain = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  height: 100%;
  
  @media (max-width: 768px) {
    height: 500px;
  }
`;

const ChatHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--gray-light);
  display: flex;
  align-items: center;
`;

const ChatAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--gray-light);
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-dark);
  font-size: 1.2rem;
`;

const ChatInfo = styled.div`
  flex: 1;
`;

const ChatName = styled.div`
  font-weight: 500;
  color: var(--text-color);
`;

const ChatStatus = styled.div`
  font-size: 0.8rem;
  color: var(--text-light);
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const MessageGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: ${props => props.sent ? 'row-reverse' : 'row'};
`;

const MessageAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--gray-light);
  margin: ${props => props.sent ? '0 0 0 0.5rem' : '0 0.5rem 0 0'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-dark);
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const MessageContent = styled.div`
  max-width: 70%;
`;

const MessageBubble = styled.div`
  background-color: ${props => props.sent ? 'var(--primary-color)' : 'var(--gray-light)'};
  color: ${props => props.sent ? 'var(--white)' : 'var(--text-color)'};
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  border-bottom-left-radius: ${props => props.sent ? '1rem' : '0.3rem'};
  border-bottom-right-radius: ${props => props.sent ? '0.3rem' : '1rem'};
  margin-bottom: 0.3rem;
`;

const MessageTime = styled.div`
  font-size: 0.7rem;
  color: var(--text-light);
  text-align: ${props => props.sent ? 'right' : 'left'};
`;

const ChatInputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid var(--gray-light);
  display: flex;
  align-items: center;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid var(--gray);
  border-radius: var(--border-radius);
  font-size: 1rem;
  margin-right: 0.5rem;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

const SendButton = styled.button`
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--secondary-color);
  }
  
  &:disabled {
    background-color: var(--gray);
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-light);
  text-align: center;
  padding: 2rem;
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--gray);
`;

const EmptyStateText = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const EmptyStateSubtext = styled.div`
  font-size: 0.9rem;
`;

const ChatPage = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const messagesEndRef = useRef(null);
  
  // Simular carregamento de dados de chat
  useEffect(() => {
    // Simulação de chamada à API
    setTimeout(() => {
      const mockChats = [
        {
          id: 1,
          name: 'João Silva',
          lastMessage: 'Olá, tenho interesse nas garrafas PET que você anunciou.',
          time: '10:30',
          unread: true,
          avatar: '👤',
          status: 'Online',
          messages: [
            { id: 1, text: 'Olá, tenho interesse nas garrafas PET que você anunciou.', sent: false, time: '10:30' },
          ]
        },
        {
          id: 2,
          name: 'Maria Oliveira',
          lastMessage: 'Qual o menor preço que você faz para as latas de alumínio?',
          time: 'Ontem',
          unread: false,
          avatar: '👤',
          status: 'Visto por último há 2h',
          messages: [
            { id: 1, text: 'Oi, vi seu anúncio de latas de alumínio.', sent: false, time: 'Ontem, 15:45' },
            { id: 2, text: 'Qual o menor preço que você faz para as latas de alumínio?', sent: false, time: 'Ontem, 15:46' },
          ]
        },
        {
          id: 3,
          name: 'Carlos Mendes',
          lastMessage: 'Obrigado pela informação!',
          time: '22/02',
          unread: false,
          avatar: '👤',
          status: 'Offline',
          messages: [
            { id: 1, text: 'Olá, você ainda tem papelão disponível?', sent: false, time: '22/02, 14:20' },
            { id: 2, text: 'Sim, tenho aproximadamente 20kg de papelão.', sent: true, time: '22/02, 14:30' },
            { id: 3, text: 'Qual o valor?', sent: false, time: '22/02, 14:32' },
            { id: 4, text: 'R$ 1,80 por kg.', sent: true, time: '22/02, 14:35' },
            { id: 5, text: 'Obrigado pela informação!', sent: false, time: '22/02, 14:40' },
          ]
        }
      ];
      
      setChats(mockChats);
    }, 1000);
  }, []);
  
  // Rolar para o final das mensagens quando uma nova mensagem é adicionada
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChat]);
  
  const handleChatSelect = (chatId) => {
    setActiveChat(chatId);
    
    // Marcar como lido
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId ? { ...chat, unread: false } : chat
      )
    );
  };
  
  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;
    
    const newMessage = {
      id: Date.now(),
      text: message,
      sent: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === activeChat ? {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: message,
          time: 'Agora'
        } : chat
      )
    );
    
    setMessage('');
    
    // Simular resposta automática (apenas para demonstração)
    if (activeChat === 1) {
      setTimeout(() => {
        const autoReply = {
          id: Date.now() + 1,
          text: 'Ótimo! Qual seria o preço por kg?',
          sent: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id === activeChat ? {
              ...chat,
              messages: [...chat.messages, autoReply],
              lastMessage: autoReply.text,
              time: 'Agora',
              unread: false
            } : chat
          )
        );
      }, 2000);
    }
  };
  
  const selectedChat = chats.find(chat => chat.id === activeChat);
  
  return (
    <ChatContainer>
      <ChatSidebar>
        <ChatSidebarHeader>
          <ChatSidebarTitle>Mensagens</ChatSidebarTitle>
          <ChatSearch>
            <input type="text" placeholder="Buscar conversa..." />
          </ChatSearch>
        </ChatSidebarHeader>
        
        <ChatList>
          {chats.length > 0 ? (
            chats.map(chat => (
              <ChatItem 
                key={chat.id} 
                active={activeChat === chat.id}
                onClick={() => handleChatSelect(chat.id)}
              >
                <ChatItemHeader>
                  <ChatItemName>
                    {chat.name}
                    <ChatItemUnread unread={chat.unread} />
                  </ChatItemName>
                  <ChatItemTime>{chat.time}</ChatItemTime>
                </ChatItemHeader>
                <ChatItemLastMessage>{chat.lastMessage}</ChatItemLastMessage>
              </ChatItem>
            ))
          ) : (
            <div style={{ padding: '1rem', color: 'var(--text-light)' }}>
              Carregando conversas...
            </div>
          )}
        </ChatList>
      </ChatSidebar>
      
      <ChatMain>
        {selectedChat ? (
          <>
            <ChatHeader>
              <ChatAvatar>{selectedChat.avatar}</ChatAvatar>
              <ChatInfo>
                <ChatName>{selectedChat.name}</ChatName>
                <ChatStatus>{selectedChat.status}</ChatStatus>
              </ChatInfo>
            </ChatHeader>
            
            <ChatMessages>
              {selectedChat.messages.map(msg => (
                <MessageGroup key={msg.id} sent={msg.sent}>
                  <MessageAvatar sent={msg.sent}>
                    {msg.sent ? '👤' : selectedChat.avatar}
                  </MessageAvatar>
                  <MessageContent>
                    <MessageBubble sent={msg.sent}>{msg.text}</MessageBubble>
                    <MessageTime sent={msg.sent}>{msg.time}</MessageTime>
                  </MessageContent>
                </MessageGroup>
              ))}
              <div ref={messagesEndRef} />
            </ChatMessages>
            
            <ChatInputContainer>
              <ChatInput 
                type="text" 
                placeholder="Digite sua mensagem..." 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <SendButton onClick={handleSendMessage} disabled={!message.trim()}>
                Enviar
              </SendButton>
            </ChatInputContainer>
          </>
        ) : (
          <EmptyState>
            <EmptyStateIcon>💬</EmptyStateIcon>
            <EmptyStateText>Selecione uma conversa</EmptyStateText>
            <EmptyStateSubtext>Escolha uma conversa à esquerda para começar a trocar mensagens</EmptyStateSubtext>
          </EmptyState>
        )}
      </ChatMain>
    </ChatContainer>
  );
};

export default ChatPage;
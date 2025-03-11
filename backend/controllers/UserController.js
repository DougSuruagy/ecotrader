const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserController {
  constructor(db) {
    this.userModel = new User(db);
  }

  async register(req, res) {
    try {
      const userData = req.body;
      const newUser = await this.userModel.create(userData);
      
      // Gerar token JWT
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.status(201).json({
        message: 'Usuário registrado com sucesso',
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          location: newUser.location
        }
      });
    } catch (error) {
      if (error.message === 'Email já cadastrado') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Buscar usuário pelo email
      const user = await this.userModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
      
      // Verificar senha
      const isPasswordValid = await this.userModel.validatePassword(user.password, password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
      
      // Gerar token JWT
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.json({
        message: 'Login realizado com sucesso',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          location: user.location,
          avatar: user.avatar
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
    }
  }

  async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await this.userModel.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          location: user.location,
          avatar: user.avatar,
          role: user.role,
          averageRating: user.averageRating,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar perfil', error: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const updateData = req.body;
      
      // Não permitir atualização de email ou role diretamente
      delete updateData.email;
      delete updateData.role;
      
      const success = await this.userModel.update(userId, updateData);
      
      if (!success) {
        return res.status(404).json({ message: 'Usuário não encontrado ou nenhuma alteração realizada' });
      }
      
      const updatedUser = await this.userModel.findById(userId);
      
      res.json({
        message: 'Perfil atualizado com sucesso',
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          location: updatedUser.location,
          avatar: updatedUser.avatar
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar perfil', error: error.message });
    }
  }

  async deleteAccount(req, res) {
    try {
      const userId = req.user.id;
      const success = await this.userModel.delete(userId);
      
      if (!success) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      
      res.json({ message: 'Conta excluída com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir conta', error: error.message });
    }
  }
}

module.exports = UserController;
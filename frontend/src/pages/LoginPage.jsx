import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
`;

const LoginTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--gray);
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    border-color: var(--primary-color);
    outline: none;
    box-shadow: 0 0 0 3px rgba(46, 204, 113, 0.2);
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  padding: 0.8rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: var(--gray);
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: var(--error-color);
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: rgba(231, 76, 60, 0.1);
  border-radius: var(--border-radius);
  text-align: center;
`;

const ForgotPassword = styled(Link)`
  text-align: right;
  display: block;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--gray-light);
  
  a {
    color: var(--primary-color);
    font-weight: 500;
  }
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validação básica
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    setLoading(true);
    
    try {
      // Aqui seria implementada a chamada à API de autenticação
      // Por enquanto, apenas simulamos um login bem-sucedido após um pequeno delay
      setTimeout(() => {
        console.log('Login realizado com sucesso!');
        // Redirecionar para a página inicial após o login
        navigate('/');
      }, 1500);
    } catch (err) {
      setError('Falha ao fazer login. Verifique suas credenciais.');
      setLoading(false);
    }
  };
  
  return (
    <LoginContainer>
      <LoginTitle>Entrar no EcoTrade</LoginTitle>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <LoginForm onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="email">E-mail</FormLabel>
          <FormInput 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Seu e-mail" 
            required 
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="password">Senha</FormLabel>
          <FormInput 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Sua senha" 
            required 
          />
        </FormGroup>
        
        <ForgotPassword to="/forgot-password">Esqueceu sua senha?</ForgotPassword>
        
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </SubmitButton>
      </LoginForm>
      
      <RegisterLink>
        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
      </RegisterLink>
    </LoginContainer>
  );
};

export default LoginPage;
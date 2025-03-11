import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RegisterContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
`;

const RegisterTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
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

const FormSelect = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--gray);
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background-color: var(--white);
  
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
  margin-top: 1rem;
  
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

const SuccessMessage = styled.div`
  color: var(--success-color);
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: rgba(46, 204, 113, 0.1);
  border-radius: var(--border-radius);
  text-align: center;
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--gray-light);
  
  a {
    color: var(--primary-color);
    font-weight: 500;
  }
`;

const TermsCheckbox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  input {
    margin-top: 0.3rem;
    margin-right: 0.5rem;
  }
  
  label {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: 'individual',
    city: '',
    state: '',
    agreeTerms: false
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    
    if (!formData.agreeTerms) {
      setError('Você precisa concordar com os termos de uso.');
      return;
    }
    
    setLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        nome: formData.name,
        email: formData.email,
        tipoUsuario: formData.userType,
        telefone: formData.phone || null,
        localizacao: {
          cidade: formData.city,
          estado: formData.state
        },
        dataCadastro: new Date().toISOString(),
        reputacao: 5,
        transacoesConcluidas: 0
      });

      setSuccess('Cadastro realizado com sucesso! Redirecionando para o login...');
      setTimeout(() => navigate('/login'), 2000);

    } catch (error) {
      console.error('Erro no cadastro:', error);
      setError(error.message.includes('email-already-in-use') 
        ? 'Este e-mail já está cadastrado.' 
        : 'Erro ao realizar cadastro. Tente novamente.');
      setLoading(false);
    }
  };
  
  return (
    <RegisterContainer>
      <RegisterTitle>Cadastre-se no EcoTrade</RegisterTitle>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      
      <RegisterForm onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="name">Nome completo *</FormLabel>
          <FormInput 
            type="text" 
            id="name" 
            name="name"
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Seu nome completo" 
            required 
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="email">E-mail *</FormLabel>
          <FormInput 
            type="email" 
            id="email" 
            name="email"
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Seu e-mail" 
            required 
          />
        </FormGroup>
        
        <FormRow>
          <FormGroup>
            <FormLabel htmlFor="password">Senha *</FormLabel>
            <FormInput 
              type="password" 
              id="password" 
              name="password"
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Sua senha" 
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="confirmPassword">Confirmar senha *</FormLabel>
            <FormInput 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword"
              value={formData.confirmPassword} 
              onChange={handleChange} 
              placeholder="Confirme sua senha" 
              required 
            />
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <FormLabel htmlFor="phone">Telefone</FormLabel>
          <FormInput 
            type="tel" 
            id="phone" 
            name="phone"
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="(00) 00000-0000" 
          />
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="userType">Tipo de usuário *</FormLabel>
          <FormSelect 
            id="userType" 
            name="userType"
            value={formData.userType} 
            onChange={handleChange} 
            required
          >
            <option value="individual">Pessoa Física</option>
            <option value="company">Empresa</option>
            <option value="cooperative">Cooperativa</option>
          </FormSelect>
        </FormGroup>
        
        <FormRow>
          <FormGroup>
            <FormLabel htmlFor="city">Cidade</FormLabel>
            <FormInput 
              type="text" 
              id="city" 
              name="city"
              value={formData.city} 
              onChange={handleChange} 
              placeholder="Sua cidade" 
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="state">Estado</FormLabel>
            <FormSelect 
              id="state" 
              name="state"
              value={formData.state} 
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </FormSelect>
          </FormGroup>
        </FormRow>
        
        <TermsCheckbox>
          <input 
            type="checkbox" 
            id="agreeTerms" 
            name="agreeTerms"
            checked={formData.agreeTerms} 
            onChange={handleChange} 
            required 
          />
          <label htmlFor="agreeTerms">
            Concordo com os <Link to="/terms">Termos de Uso</Link> e <Link to="/privacy">Política de Privacidade</Link> do EcoTrade.
          </label>
        </TermsCheckbox>
        
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </SubmitButton>
      </RegisterForm>
      
      <LoginLink>
        Já tem uma conta? <Link to="/login">Faça login</Link>
      </LoginLink>
    </RegisterContainer>
  );
};

export default RegisterPage;
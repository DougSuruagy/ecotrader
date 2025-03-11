import React, { useState } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--gray-light);
  margin-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--gray-dark);
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h1`
  margin-bottom: 0.5rem;
  color: var(--text-color);
`;

const ProfileType = styled.p`
  color: var(--text-light);
  margin-bottom: 0.5rem;
`;

const ProfileStats = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--text-light);
`;

const TabsContainer = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--gray);
  display: flex;
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-color)'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const TabContent = styled.div`
  padding: 1.5rem 0;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
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
  padding: 0.8rem 1.5rem;
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
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.div`
  height: 160px;
  background-color: var(--gray-light);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-dark);
  font-size: 2rem;
`;

const ProductContent = styled.div`
  padding: 1rem;
`;

const ProductTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const ProductPrice = styled.div`
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const ProductStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const StatusBadge = styled.span`
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  background-color: ${props => {
    switch(props.status) {
      case 'active': return 'rgba(46, 204, 113, 0.2)';
      case 'pending': return 'rgba(243, 156, 18, 0.2)';
      case 'sold': return 'rgba(52, 152, 219, 0.2)';
      default: return 'rgba(0, 0, 0, 0.1)';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'active': return 'var(--success-color)';
      case 'pending': return 'var(--warning-color)';
      case 'sold': return 'var(--accent-color)';
      default: return 'var(--text-light)';
    }
  }};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: var(--text-light);
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--gray);
`;

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [userProfile, setUserProfile] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    userType: 'individual',
    city: 'São Paulo',
    state: 'SP',
    bio: 'Entusiasta da reciclagem e sustentabilidade. Busco sempre dar uma nova vida aos materiais que seriam descartados.',
    stats: {
      products: 8,
      sales: 12,
      rating: 4.8
    }
  });
  
  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'Garrafas PET',
      price: 'R$ 2,50/kg',
      quantity: '15kg',
      status: 'active'
    },
    {
      id: 2,
      title: 'Papelão',
      price: 'R$ 1,80/kg',
      quantity: '30kg',
      status: 'active'
    },
    {
      id: 3,
      title: 'Latas de Alumínio',
      price: 'R$ 5,00/kg',
      quantity: '8kg',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Vidro Transparente',
      price: 'R$ 0,70/kg',
      quantity: '20kg',
      status: 'sold'
    }
  ]);
  
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Aqui seria implementada a lógica para atualizar o perfil do usuário
    alert('Perfil atualizado com sucesso!');
  };
  
  const renderTabContent = () => {
    switch(activeTab) {
      case 'products':
        return (
          <>
            {products.length > 0 ? (
              <ProductGrid>
                {products.map(product => (
                  <ProductCard key={product.id}>
                    <ProductImage>📦</ProductImage>
                    <ProductContent>
                      <ProductTitle>{product.title}</ProductTitle>
                      <ProductPrice>{product.price}</ProductPrice>
                      <div>Quantidade: {product.quantity}</div>
                      <ProductStatus>
                        <StatusBadge status={product.status}>
                          {product.status === 'active' && 'Ativo'}
                          {product.status === 'pending' && 'Pendente'}
                          {product.status === 'sold' && 'Vendido'}
                        </StatusBadge>
                        <span>Editar</span>
                      </ProductStatus>
                    </ProductContent>
                  </ProductCard>
                ))}
              </ProductGrid>
            ) : (
              <EmptyState>
                <EmptyStateIcon>📦</EmptyStateIcon>
                <h3>Nenhum produto cadastrado</h3>
                <p>Você ainda não cadastrou nenhum material para venda ou troca.</p>
              </EmptyState>
            )}
          </>
        );
      case 'profile':
        return (
          <form onSubmit={handleProfileUpdate}>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="name">Nome completo</FormLabel>
                <FormInput 
                  type="text" 
                  id="name" 
                  value={userProfile.name} 
                  onChange={(e) => setUserProfile({...userProfile, name: e.target.value})} 
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <FormInput 
                  type="email" 
                  id="email" 
                  value={userProfile.email} 
                  onChange={(e) => setUserProfile({...userProfile, email: e.target.value})} 
                />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="phone">Telefone</FormLabel>
                <FormInput 
                  type="tel" 
                  id="phone" 
                  value={userProfile.phone} 
                  onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})} 
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="userType">Tipo de usuário</FormLabel>
                <FormSelect 
                  id="userType" 
                  value={userProfile.userType} 
                  onChange={(e) => setUserProfile({...userProfile, userType: e.target.value})} 
                >
                  <option value="individual">Pessoa Física</option>
                  <option value="company">Empresa</option>
                  <option value="cooperative">Cooperativa</option>
                </FormSelect>
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="city">Cidade</FormLabel>
                <FormInput 
                  type="text" 
                  id="city" 
                  value={userProfile.city} 
                  onChange={(e) => setUserProfile({...userProfile, city: e.target.value})} 
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="state">Estado</FormLabel>
                <FormSelect 
                  id="state" 
                  value={userProfile.state}
                  onChange={(e) => setUserProfile({...userProfile, state: e.target.value})}
                >
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
            
            <SubmitButton type="submit">Salvar alterações</SubmitButton>
          </form>
        );
      default:
        return null;
    }
  };
  
  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileAvatar>👤</ProfileAvatar>
        <ProfileInfo>
          <ProfileName>{userProfile.name}</ProfileName>
          <ProfileType>
            {userProfile.userType === 'individual' && 'Pessoa Física'}
            {userProfile.userType === 'company' && 'Empresa'}
            {userProfile.userType === 'cooperative' && 'Cooperativa'}
          </ProfileType>
          <div>{userProfile.city}, {userProfile.state}</div>
          
          <ProfileStats>
            <StatItem>
              <StatNumber>{userProfile.stats.products}</StatNumber>
              <StatLabel>Produtos</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{userProfile.stats.sales}</StatNumber>
              <StatLabel>Vendas</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>{userProfile.stats.rating}</StatNumber>
              <StatLabel>Avaliação</StatLabel>
            </StatItem>
          </ProfileStats>
        </ProfileInfo>
      </ProfileHeader>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'products'} 
          onClick={() => setActiveTab('products')}
        >
          Meus Produtos
        </Tab>
        <Tab 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')}
        >
          Editar Perfil
        </Tab>
      </TabsContainer>
      
      <TabContent>
        {renderTabContent()}
      </TabContent>
    </ProfileContainer>
  );
};

export default ProfilePage;
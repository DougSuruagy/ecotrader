import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: var(--white);
  box-shadow: var(--shadow);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  
  span {
    color: var(--text-color);
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--white);
    box-shadow: var(--shadow);
    padding: 1rem;
  }
`;

const NavLink = styled(Link)`
  margin: 0 1rem;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
  
  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }
`;

const Button = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-left: 1rem;
  
  &.login {
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    
    &:hover {
      background-color: var(--primary-color);
      color: var(--white);
    }
  }
  
  &.register {
    background-color: var(--primary-color);
    color: var(--white);
    
    &:hover {
      background-color: var(--secondary-color);
    }
  }
  
  @media (max-width: 768px) {
    margin: 0.5rem 0;
    width: 100%;
    text-align: center;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-color);
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--gray-light);
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
    margin: 1rem 0;
  }
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  width: 100%;
  font-size: 0.9rem;
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Temporário, será substituído por autenticação real
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/products?search=${e.target.value}`);
    }
  };
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <span>Eco</span>Trade
        </Logo>
        
        <MenuButton onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </MenuButton>
        
        <Nav isOpen={isMenuOpen}>
          <NavLink to="/">Início</NavLink>
          <NavLink to="/products">Produtos</NavLink>
          <NavLink to="/how-it-works">Como Funciona</NavLink>
          
          <SearchBar>
            <SearchInput 
              placeholder="Buscar materiais..."
              onKeyPress={handleSearch}
            />
          </SearchBar>
          
          {isLoggedIn ? (
            <>
              <NavLink to="/add-product">Anunciar</NavLink>
              <NavLink to="/chat">Mensagens</NavLink>
              <NavLink to="/profile">Minha Conta</NavLink>
            </>
          ) : (
            <AuthButtons>
              <Button to="/login" className="login">Entrar</Button>
              <Button to="/register" className="register">Cadastrar</Button>
            </AuthButtons>
          )}
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  max-width: 600px;
  margin: 4rem auto;
  padding: 2rem;
  text-align: center;
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
`;

const NotFoundTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const NotFoundText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--text-light);
`;

const NotFoundIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 2rem;
  color: var(--accent-color);
`;

const HomeButton = styled(Link)`
  display: inline-block;
  padding: 0.8rem 2rem;
  background-color: var(--primary-color);
  color: var(--white);
  border-radius: var(--border-radius);
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <NotFoundIcon>🔍</NotFoundIcon>
      <NotFoundTitle>Página não encontrada</NotFoundTitle>
      <NotFoundText>
        A página que você está procurando não existe ou foi movida.
      </NotFoundText>
      <HomeButton to="/">Voltar para a página inicial</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--text-color);
  color: var(--white);
  padding: 3rem 2rem 2rem;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: var(--white);
  font-weight: 600;
`;

const FooterLink = styled(Link)`
  color: var(--gray-light);
  margin-bottom: 0.8rem;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const FooterText = styled.p`
  color: var(--gray-light);
  margin-bottom: 0.8rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: var(--white);
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--gray-light);
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>EcoTrade</FooterTitle>
          <FooterText>
            Marketplace de materiais recicláveis que conecta pessoas e empresas interessadas em comprar, vender ou trocar resíduos que normalmente seriam descartados.
          </FooterText>
          <SocialLinks>
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">📱</SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">📱</SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">📱</SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">📱</SocialIcon>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Links Úteis</FooterTitle>
          <FooterLink to="/">Início</FooterLink>
          <FooterLink to="/products">Produtos</FooterLink>
          <FooterLink to="/how-it-works">Como Funciona</FooterLink>
          <FooterLink to="/about">Sobre Nós</FooterLink>
          <FooterLink to="/contact">Contato</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Categorias</FooterTitle>
          <FooterLink to="/products?category=plasticos">Plásticos</FooterLink>
          <FooterLink to="/products?category=metais">Metais</FooterLink>
          <FooterLink to="/products?category=papel">Papel e Papelão</FooterLink>
          <FooterLink to="/products?category=vidro">Vidro</FooterLink>
          <FooterLink to="/products?category=eletronicos">Eletrônicos</FooterLink>
          <FooterLink to="/products?category=texteis">Têxteis</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contato</FooterTitle>
          <FooterText>📍 Rua Exemplo, 123 - São Paulo, SP</FooterText>
          <FooterText>📞 (11) 99999-9999</FooterText>
          <FooterText>✉️ contato@ecotrade.com.br</FooterText>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <p>&copy; {new Date().getFullYear()} EcoTrade. Todos os direitos reservados.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
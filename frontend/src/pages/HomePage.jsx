import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/src/assets/hero-bg.jpg');
  background-size: cover;
  background-position: center;
  color: var(--white);
  padding: 5rem 2rem;
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.8rem 2rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &.primary {
    background-color: var(--primary-color);
    color: var(--white);
    
    &:hover {
      background-color: var(--secondary-color);
      transform: translateY(-3px);
    }
  }
  
  &.secondary {
    background-color: transparent;
    color: var(--white);
    border: 2px solid var(--white);
    
    &:hover {
      background-color: var(--white);
      color: var(--text-color);
      transform: translateY(-3px);
    }
  }
`;

const Section = styled.section`
  padding: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto 3rem;
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: var(--primary-color);
    margin: 1rem auto 0;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
`;

const FeatureTitle = styled.h3`
  margin-bottom: 1rem;
`;

const CategorySection = styled(Section)`
  background-color: var(--gray-light);
  border-radius: var(--border-radius);
  padding-bottom: 4rem;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(Link)`
  display: block;
  background-color: var(--white);
  border-radius: var(--border-radius);
  overflow: hidden;
  text-decoration: none;
  color: var(--text-color);
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryImage = styled.div`
  height: 180px;
  background-color: var(--gray);
  background-size: cover;
  background-position: center;
`;

const CategoryContent = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const CategoryTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const StatsSection = styled(Section)`
  background-color: var(--primary-color);
  color: var(--white);
  border-radius: var(--border-radius);
  text-align: center;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
`;

const TestimonialsSection = styled(Section)`
  text-align: center;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem;
  text-align: left;
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:before {
    content: '"';
    font-size: 3rem;
    color: var(--gray);
    position: absolute;
    top: -1.5rem;
    left: -0.5rem;
    opacity: 0.3;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--gray);
  margin-right: 1rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.div`
  font-weight: 600;
  margin-bottom: 0.2rem;
`;

const AuthorRole = styled.div`
  font-size: 0.9rem;
  color: var(--text-light);
`;

const CtaSection = styled.section`
  background-color: var(--accent-color);
  color: var(--white);
  padding: 4rem 2rem;
  text-align: center;
  margin-bottom: 3rem;
  border-radius: var(--border-radius);
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const CtaTitle = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CtaText = styled.p`
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.1rem;
`;

const HomePage = () => {
  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Transforme Resíduos em Recursos</HeroTitle>
          <HeroSubtitle>
            O EcoTrade conecta pessoas e empresas para comprar, vender ou trocar materiais recicláveis, 
            promovendo a economia circular e um futuro mais sustentável.
          </HeroSubtitle>
          <ButtonGroup>
            <Button to="/products" className="primary">Explorar Produtos</Button>
            <Button to="/register" className="secondary">Cadastre-se Grátis</Button>
          </ButtonGroup>
        </HeroContent>
      </HeroSection>
      
      <Section>
        <SectionTitle>Como Funciona</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>📦</FeatureIcon>
            <FeatureTitle>Cadastre seus Materiais</FeatureTitle>
            <p>Fotografe e descreva os materiais recicláveis que você deseja vender ou trocar.</p>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔍</FeatureIcon>
            <FeatureTitle>Encontre Compradores</FeatureTitle>
            <p>Conecte-se com pessoas e empresas interessadas nos seus materiais recicláveis.</p>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>💬</FeatureIcon>
            <FeatureTitle>Negocie Diretamente</FeatureTitle>
            <p>Use nosso sistema de chat para combinar preços, quantidades e formas de entrega.</p>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>💰</FeatureIcon>
            <FeatureTitle>Receba seu Pagamento</FeatureTitle>
            <p>Utilize nosso sistema seguro de pagamentos para receber pelo material vendido.</p>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🌱</FeatureIcon>
            <FeatureTitle>Impacto Ambiental</FeatureTitle>
            <p>Acompanhe o impacto positivo que suas transações geram para o meio ambiente.</p>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>⭐</FeatureIcon>
            <FeatureTitle>Construa sua Reputação</FeatureTitle>
            <p>Receba avaliações positivas e torne-se um vendedor confiável na plataforma.</p>
          </FeatureCard>
        </FeaturesGrid>
      </Section>
      
      <CategorySection>
        <SectionTitle>Categorias de Materiais</SectionTitle>
        <CategoriesGrid>
          <CategoryCard to="/products?category=plasticos">
            <CategoryImage style={{ backgroundColor: '#e74c3c' }} />
            <CategoryContent>
              <CategoryTitle>Plásticos</CategoryTitle>
              <p>PET, PEAD, PVC e outros</p>
            </CategoryContent>
          </CategoryCard>
          
          <CategoryCard to="/products?category=metais">
            <CategoryImage style={{ backgroundColor: '#3498db' }} />
            <CategoryContent>
              <CategoryTitle>Metais</CategoryTitle>
              <p>Alumínio, cobre, ferro e outros</p>
            </CategoryContent>
          </CategoryCard>
          
          <CategoryCard to="/products?category=papel">
            <CategoryImage style={{ backgroundColor: '#f1c40f' }} />
            <CategoryContent>
              <CategoryTitle>Papel e Papelão</CategoryTitle>
              <p>Jornais, revistas, caixas e outros</p>
            </CategoryContent>
          </CategoryCard>
          
          <CategoryCard to="/products?category=vidro">
            <CategoryImage style={{ backgroundColor: '#1abc9c' }} />
            <CategoryContent>
              <CategoryTitle>Vidro</CategoryTitle>
              <p>Garrafas, potes, cacos e outros</p>
            </CategoryContent>
          </CategoryCard>
          
          <CategoryCard to="/products?category=eletronicos">
            <CategoryImage style={{ backgroundColor: '#9b59b6' }} />
            <CategoryContent>
              <CategoryTitle>Eletrônicos</CategoryTitle>
              <p>Computadores, celulares, componentes e outros</p>
            </CategoryContent>
          </CategoryCard>
          
          <CategoryCard to="/products?category=texteis">
            <CategoryImage style={{ backgroundColor: '#34495e' }} />
            <CategoryContent>
              <CategoryTitle>Têxteis</CategoryTitle>
              <p>Roupas, tecidos, retalhos e outros</p>
            </CategoryContent>
          </CategoryCard>
          
          <CategoryCard to="/products?category=madeira">
            <CategoryImage style={{ backgroundColor: '#d35400' }} />
            <CategoryContent>
              <CategoryTitle>Madeira</CategoryTitle>
              <p>Paletes, móveis, restos de construção e outros</p>
            </CategoryContent>
          </CategoryCard>
          
          <CategoryCard to="/products?category=outros">
            <CategoryImage style={{ backgroundColor: '#7f8c8d' }} />
            <CategoryContent>
              <CategoryTitle>Outros Materiais</CategoryTitle>
              <p>Borracha, isopor, materiais compostos e mais</p>
            </CategoryContent>
          </CategoryCard>
        </CategoriesGrid>
      </CategorySection>
      
      <StatsSection>
        <SectionTitle>Nosso Impacto</SectionTitle>
        <StatsGrid>
          <StatItem>
            <StatNumber>5.000+</StatNumber>
            <StatLabel>Usuários Cadastrados</StatLabel>
          </StatItem>
          
          <StatItem>
            <StatNumber>12.500+</StatNumber>
            <StatLabel>Transações Realizadas</StatLabel>
          </StatItem>
          
          <StatItem>
            <StatNumber>850+</StatNumber>
            <StatLabel>Toneladas Recicladas</StatLabel>
          </StatItem>
          
          <StatItem>
            <StatNumber>1.200+</StatNumber>
            <StatLabel>Árvores Salvas</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsSection>
      
      <TestimonialsSection>
        <SectionTitle>O Que Nossos Usuários Dizem</SectionTitle>
        <TestimonialsGrid>
          <TestimonialCard>
            <TestimonialText>
              "O EcoTrade transformou meu pequeno negócio de artesanato. Agora consigo encontrar materiais recicláveis de qualidade por preços acessíveis, além de estar contribuindo para um planeta mais sustentável."
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar />
              <AuthorInfo>
                <AuthorName>Ana Silva</AuthorName>
                <AuthorRole>Artesã</AuthorRole>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
          
          <TestimonialCard>
            <TestimonialText>
              "Como catador de materiais recicláveis, o EcoTrade me ajudou a encontrar compradores que valorizam meu trabalho e pagam um preço justo. Minha renda aumentou significativamente!"
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar />
              <AuthorInfo>
                <AuthorName>Carlos Oliveira</AuthorName>
                <AuthorRole>Catador</AuthorRole>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
          
          <TestimonialCard>
            <TestimonialText>
              "Nossa empresa de construção civil conseguiu reduzir custos e o impacto ambiental ao mesmo tempo, comprando materiais reciclados através do EcoTrade. Uma plataforma que realmente funciona!"
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar />
              <AuthorInfo>
                <AuthorName>Marcelo Santos</AuthorName>
                <AuthorRole>Engenheiro Civil</AuthorRole>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
        </TestimonialsGrid>
      </TestimonialsSection>
      
      <CtaSection>
        <CtaTitle>Pronto para Começar?</CtaTitle>
        <CtaText>
          Junte-se a milhares de pessoas e empresas que já estão transformando resíduos em recursos, 
          gerando renda extra e contribuindo para um planeta mais sustentável.
        </CtaText>
        <Button to="/register" className="secondary">Cadastre-se Gratuitamente</Button>
      </CtaSection>
    </>
  );
};

export default HomePage;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const ProductDetailContainer = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
`;

const BreadcrumbNav = styled.div`
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: var(--text-light);
  
  a {
    color: var(--text-light);
    text-decoration: none;
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

const ProductContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductGallery = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
`;

const MainImage = styled.div`
  height: 400px;
  background-color: var(--gray-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  color: var(--gray);
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  padding: 1rem;
  gap: 0.5rem;
`;

const Thumbnail = styled.div`
  width: 80px;
  height: 80px;
  background-color: var(--gray-light);
  border-radius: var(--border-radius);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--gray);
  border: 2px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary-color);
  }
`;

const ProductInfo = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem;
`;

const ProductTitle = styled.h1`
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const ProductCategory = styled.div`
  display: inline-block;
  background-color: var(--gray-light);
  color: var(--text-light);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
`;

const ProductPrice = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const ProductQuantity = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const ProductDescription = styled.div`
  margin-bottom: 2rem;
  line-height: 1.6;
  color: var(--text-color);
`;

const ProductLocation = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: var(--text-light);
  
  svg {
    margin-right: 0.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &.primary {
    background-color: var(--primary-color);
    color: var(--white);
    border: none;
    
    &:hover {
      background-color: var(--secondary-color);
      transform: translateY(-2px);
    }
  }
  
  &.secondary {
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    
    &:hover {
      background-color: rgba(46, 204, 113, 0.1);
      transform: translateY(-2px);
    }
  }
`;

const SellerCard = styled.div`
  border-top: 1px solid var(--gray-light);
  padding-top: 1.5rem;
  margin-top: 1.5rem;
`;

const SellerHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const SellerAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--gray-light);
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-dark);
  font-size: 1.5rem;
`;

const SellerInfo = styled.div`
  flex: 1;
`;

const SellerName = styled.div`
  font-weight: 600;
  margin-bottom: 0.2rem;
`;

const SellerRating = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-light);
  font-size: 0.9rem;
  
  span {
    margin-left: 0.5rem;
  }
`;

const AdditionalInfo = styled.div`
  margin-top: 3rem;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid var(--gray);
  margin-bottom: 1.5rem;
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
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem;
`;

const SpecificationList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SpecificationItem = styled.div`
  display: flex;
  border-bottom: 1px solid var(--gray-light);
  padding-bottom: 0.8rem;
`;

const SpecificationLabel = styled.div`
  width: 50%;
  font-weight: 500;
  color: var(--text-color);
`;

const SpecificationValue = styled.div`
  width: 50%;
  color: var(--text-light);
`;

const RelatedProductsSection = styled.div`
  margin-top: 3rem;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: var(--text-color);
`;

const RelatedProductsGrid = styled.div`
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

const RelatedProductCard = styled(Link)`
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  text-decoration: none;
  color: var(--text-color);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const RelatedProductImage = styled.div`
  height: 160px;
  background-color: var(--gray-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--gray);
`;

const RelatedProductContent = styled.div`
  padding: 1rem;
`;

const RelatedProductTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const RelatedProductPrice = styled.div`
  font-weight: 600;
  color: var(--primary-color);
`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [activeImage, setActiveImage] = useState(0);
  
  // Simular carregamento de dados do produto da API
  useEffect(() => {
    setLoading(true);
    
    // Simulação de chamada à API
    setTimeout(() => {
      // Dados de exemplo
      const mockProduct = {
        id: parseInt(id),
        title: 'Garrafas PET',
        category: 'Plásticos',
        price: 'R$ 2,50/kg',
        quantity: '15kg disponíveis',
        description: 'Garrafas PET transparentes de 2 litros, limpas e sem rótulos. Ideal para reciclagem e projetos de reutilização. Material em ótimo estado, coletado de forma sustentável.',
        location: 'São Paulo, SP',
        images: [0, 1, 2, 3],
        specifications: [
          { label: 'Tipo de Material', value: 'PET (Polietileno Tereftalato)' },
          { label: 'Cor', value: 'Transparente' },
          { label: 'Estado', value: 'Limpo, sem rótulos' },
          { label: 'Quantidade Mínima', value: '5kg' },
          { label: 'Forma de Entrega', value: 'Retirada ou entrega a combinar' },
          { label: 'Data de Publicação', value: '15/03/2023' }
        ],
        seller: {
          id: 1,
          name: 'João Silva',
          rating: 4.8,
          memberSince: 'Membro desde Jan/2022',
          responseTime: 'Responde em até 2 horas'
        },
        relatedProducts: [
          {
            id: 2,
            title: 'Papelão',
            price: 'R$ 1,80/kg'
          },
          {
            id: 3,
            title: 'Latas de Alumínio',
            price: 'R$ 5,00/kg'
          },
          {
            id: 5,
            title: 'Garrafas de Vidro',
            price: 'R$ 0,90/kg'
          }
        ]
      };
      
      setProduct(mockProduct);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  if (loading) {
    return (
      <ProductDetailContainer>
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          Carregando informações do produto...
        </div>
      </ProductDetailContainer>
    );
  }
  
  if (!product) {
    return (
      <ProductDetailContainer>
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          Produto não encontrado.
        </div>
      </ProductDetailContainer>
    );
  }
  
  return (
    <ProductDetailContainer>
      <BreadcrumbNav>
        <Link to="/">Início</Link> &gt; <Link to="/products">Produtos</Link> &gt; <Link to={`/products?category=${product.category.toLowerCase()}`}>{product.category}</Link> &gt; {product.title}
      </BreadcrumbNav>
      
      <ProductContent>
        <ProductGallery>
          <MainImage>
            📦
          </MainImage>
          <ThumbnailsContainer>
            {product.images.map((img, index) => (
              <Thumbnail 
                key={index} 
                active={activeImage === index}
                onClick={() => setActiveImage(index)}
              >
                📦
              </Thumbnail>
            ))}
          </ThumbnailsContainer>
        </ProductGallery>

        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductCategory>{product.category}</ProductCategory>
          <ProductPrice>{product.price}</ProductPrice>
          <ProductQuantity>{product.quantity}</ProductQuantity>
          <ProductDescription>{product.description}</ProductDescription>

          <ProductLocation>
            📍 {product.location}
          </ProductLocation>

          <ButtonGroup>
            <Button className="primary">Comprar Agora</Button>
            <Button className="secondary">Enviar Mensagem</Button>
          </ButtonGroup>

          <SellerCard>
            <SellerHeader>
              <SellerAvatar>👤</SellerAvatar>
              <SellerInfo>
                <SellerName>{product.seller.name}</SellerName>
                <SellerRating>
                  ⭐ {product.seller.rating} <span>({product.seller.memberSince})</span>
                </SellerRating>
              </SellerInfo>
            </SellerHeader>
            <p>Resposta média: {product.seller.responseTime}</p>
          </SellerCard>

          <AdditionalInfo>
            <TabsContainer>
              <Tab active={activeTab === 'details'} onClick={() => setActiveTab('details')}>
                Detalhes
              </Tab>
              <Tab active={activeTab === 'specs'} onClick={() => setActiveTab('specs')}>
                Especificações
              </Tab>
            </TabsContainer>

            <TabContent>
              {activeTab === 'details' && (
                <div>
                  <p>{product.description}</p>
                </div>
              )}
              {activeTab === 'specs' && (
                <SpecificationList>
                  {product.specifications.map((spec, index) => (
                    <SpecificationItem key={index}>
                      <SpecificationLabel>{spec.label}</SpecificationLabel>
                      <SpecificationValue>{spec.value}</SpecificationValue>
                    </SpecificationItem>
                  ))}
                </SpecificationList>
              )}
            </TabContent>
          </AdditionalInfo>

          <RelatedProductsSection>
            <SectionTitle>Produtos Relacionados</SectionTitle>
            <RelatedProductsGrid>
              {product.relatedProducts.map((relatedProduct) => (
                <RelatedProductCard to={`/product/${relatedProduct.id}`} key={relatedProduct.id}>
                  <RelatedProductImage>📦</RelatedProductImage>
                  <RelatedProductContent>
                    <RelatedProductTitle>{relatedProduct.title}</RelatedProductTitle>
                    <RelatedProductPrice>{relatedProduct.price}</RelatedProductPrice>
                  </RelatedProductContent>
                </RelatedProductCard>
              ))}
            </RelatedProductsGrid>
          </RelatedProductsSection>
        </ProductInfo>
      </ProductContent>
    </ProductDetailContainer>
  );
};

export default ProductDetailPage;
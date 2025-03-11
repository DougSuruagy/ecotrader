import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const ProductListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background-color: var(--background-color);
  min-height: 100vh;
`;

const ProductListHeader = styled.div`
  margin-bottom: 2rem;
`;

const ProductListTitle = styled.h1`
  margin-bottom: 1rem;
  color: var(--text-color);
`;

const ProductListDescription = styled.p`
  color: var(--text-light);
  margin-bottom: 2rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--gray);
  border-radius: var(--border-radius);
  font-size: 1rem;
  background-color: var(--white);
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--gray);
  border-radius: var(--border-radius);
  font-size: 1rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background-color: var(--gray-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--gray);
`;

const ProductContent = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: var(--text-color);
`;

const ProductPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const ProductLocation = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ProductSeller = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-light);
`;

const SellerAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--gray-light);
  margin-right: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-dark);
  font-size: 1.2rem;
`;

const SellerInfo = styled.div`
  flex: 1;
`;

const SellerName = styled.div`
  font-weight: 500;
  color: var(--text-color);
`;

const SellerRating = styled.div`
  display: flex;
  align-items: center;
  color: var(--text-light);
  font-size: 0.9rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.3rem;
  border: 1px solid ${props => props.active ? 'var(--primary-color)' : 'var(--gray)'};
  background-color: ${props => props.active ? 'var(--primary-color)' : 'var(--white)'};
  color: ${props => props.active ? 'var(--white)' : 'var(--text-color)'};
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--primary-color)' : 'var(--gray-light)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
`;

const EmptyStateIcon = styled.div`
  font-size: 4rem;
  color: var(--gray);
  margin-bottom: 1.5rem;
`;

const ProductListPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: categoryParam || '',
    priceRange: '',
    location: '',
    sortBy: 'newest'
  });
  
  // Simular carregamento de produtos da API
  useEffect(() => {
    setLoading(true);
    
    // Simulação de chamada à API
    setTimeout(() => {
      // Dados de exemplo
      const mockProducts = [
        {
          id: 1,
          title: 'Garrafas PET',
          price: 'R$ 2,50/kg',
          quantity: '15kg',
          location: 'São Paulo, SP',
          category: 'plasticos',
          seller: {
            name: 'João Silva',
            rating: 4.8
          }
        },
        {
          id: 2,
          title: 'Papelão',
          price: 'R$ 1,80/kg',
          quantity: '30kg',
          location: 'Campinas, SP',
          category: 'papel',
          seller: {
            name: 'Cooperativa ReciclaVida',
            rating: 4.9
          }
        },
        {
          id: 3,
          title: 'Latas de Alumínio',
          price: 'R$ 5,00/kg',
          quantity: '8kg',
          location: 'Rio de Janeiro, RJ',
          category: 'metais',
          seller: {
            name: 'Maria Oliveira',
            rating: 4.7
          }
        },
        {
          id: 4,
          title: 'Vidro Transparente',
          price: 'R$ 0,70/kg',
          quantity: '20kg',
          location: 'Belo Horizonte, MG',
          category: 'vidro',
          seller: {
            name: 'Carlos Santos',
            rating: 4.5
          }
        },
        {
          id: 5,
          title: 'Placas de Circuito',
          price: 'R$ 15,00/kg',
          quantity: '3kg',
          location: 'Curitiba, PR',
          category: 'eletronicos',
          seller: {
            name: 'TechRecycle',
            rating: 4.9
          }
        },
        {
          id: 6,
          title: 'Retalhos de Tecido',
          price: 'R$ 3,00/kg',
          quantity: '10kg',
          location: 'Fortaleza, CE',
          category: 'texteis',
          seller: {
            name: 'Ana Costura',
            rating: 4.6
          }
        }
      ];
      
      // Filtrar produtos com base nos parâmetros da URL
      let filteredProducts = [...mockProducts];
      
      if (categoryParam) {
        filteredProducts = filteredProducts.filter(product => 
          product.category === categoryParam
        );
      }
      
      if (searchParam) {
        const searchLower = searchParam.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
          product.title.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
        );
      }
      
      setProducts(filteredProducts);
      setLoading(false);
    }, 1000);
  }, [categoryParam, searchParam]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
      <ProductListContainer>
        <ProductListHeader>
          <ProductListTitle>Materiais Recicláveis</ProductListTitle>
          <ProductListDescription>
            Encontre materiais recicláveis disponíveis para compra ou troca.
          </ProductListDescription>
        </ProductListHeader>
  
        <FiltersContainer>
          <FilterGroup>
            <FilterLabel htmlFor="sortBy">Ordenar por</FilterLabel>
            <FilterSelect 
              id="sortBy" 
              name="sortBy" 
              value={filters.sortBy}
              onChange={handleFilterChange}
            >
              <option value="newest">Mais recentes</option>
              <option value="priceAsc">Menor preço</option>
              <option value="priceDesc">Maior preço</option>
            </FilterSelect>
          </FilterGroup>
  
          <FilterGroup>
            <FilterLabel htmlFor="category">Categoria</FilterLabel>
            <FilterSelect 
              id="category" 
              name="category" 
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">Todas as categorias</option>
              <option value="plasticos">Plásticos</option>
              <option value="metais">Metais</option>
              <option value="papel">Papel e Papelão</option>
              <option value="vidro">Vidro</option>
              <option value="eletronicos">Eletrônicos</option>
              <option value="texteis">Têxteis</option>
              <option value="madeira">Madeira</option>
              <option value="outros">Outros</option>
            </FilterSelect>
          </FilterGroup>
  
          <FilterGroup>
            <FilterLabel htmlFor="priceRange">Faixa de Preço</FilterLabel>
            <FilterSelect 
              id="priceRange" 
              name="priceRange" 
              value={filters.priceRange}
              onChange={handleFilterChange}
            >
              <option value="">Qualquer preço</option>
              <option value="0-1">Até R$ 1,00/kg</option>
              <option value="1-5">R$ 1,00 a R$ 5,00/kg</option>
              <option value="5-10">R$ 5,00 a R$ 10,00/kg</option>
              <option value="10+">Acima de R$ 10,00/kg</option>
            </FilterSelect>
          </FilterGroup>
  
          <FilterGroup>
            <FilterLabel htmlFor="location">Localização</FilterLabel>
            <FilterInput 
              type="text" 
              id="location" 
              name="location" 
              placeholder="Digite cidade ou estado" 
              value={filters.location}
              onChange={handleFilterChange}
            />
          </FilterGroup>
        </FiltersContainer>
  
        {loading ? (
          <EmptyState>
            <EmptyStateIcon>⌛</EmptyStateIcon>
            <h2>Carregando produtos...</h2>
          </EmptyState>
        ) : products.length === 0 ? (
          <EmptyState>
            <EmptyStateIcon>🔍</EmptyStateIcon>
            <h2>Nenhum produto encontrado</h2>
            <p>Tente ajustar os filtros ou realizar uma nova busca.</p>
          </EmptyState>
        ) : (
          <>
            <ProductGrid>
              {products.map(product => (
                <ProductCard key={product.id}>
                  <ProductImage>📦</ProductImage>
                  <ProductContent>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductPrice>{product.price}</ProductPrice>
                    <ProductLocation>📍 {product.location}</ProductLocation>
                    <ProductSeller>
                      <SellerAvatar>👤</SellerAvatar>
                      <SellerInfo>
                        <SellerName>{product.seller.name}</SellerName>
                        <SellerRating>⭐ {product.seller.rating}</SellerRating>
                      </SellerInfo>
                    </ProductSeller>
                  </ProductContent>
                </ProductCard>
              ))}
            </ProductGrid>
  
            <PaginationContainer>
              <PaginationButton 
                disabled={true} 
                onClick={() => {}}
              >
                Anterior
              </PaginationButton>
              <PaginationButton active={true}>1</PaginationButton>
              <PaginationButton>2</PaginationButton>
              <PaginationButton>3</PaginationButton>
              <PaginationButton 
                onClick={() => {}}
              >
                Próxima
              </PaginationButton>
            </PaginationContainer>
          </>
        )}
      </ProductListContainer>
  );
};

export default ProductListPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AddProductContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
`;

const AddProductTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
`;

const AddProductForm = styled.form`
  display: flex;
  flex-direction: column;
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

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--gray);
  border-radius: var(--border-radius);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
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

const ImageUploadContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const ImagePreview = styled.div`
  width: 100px;
  height: 100px;
  border-radius: var(--border-radius);
  background-color: var(--gray-light);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: rgba(231, 76, 60, 0.8);
    color: white;
    border: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    
    &:hover {
      background-color: rgba(231, 76, 60, 1);
    }
  }
`;

const UploadButton = styled.label`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: var(--gray-light);
  color: var(--text-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--gray);
  }
  
  input {
    display: none;
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius);
  padding: 1rem 1.5rem;
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

const AddProductPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    quantity: '',
    description: '',
    location: '',
    images: []
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImageUpload = (e) => {
    // Em uma implementação real, aqui seria feito o upload das imagens para um servidor
    // Por enquanto, apenas simularemos o upload criando URLs locais
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      const newImages = files.map(file => ({
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file),
        file
      }));
      
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  };
  
  const removeImage = (id) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== id)
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Aqui seria implementada a chamada à API para salvar o produto
      // Por enquanto, apenas simulamos um sucesso após um pequeno delay
      setTimeout(() => {
        console.log('Produto adicionado com sucesso!', formData);
        // Redirecionar para a página de detalhes do produto (simulando um ID)
        navigate('/products/123');
      }, 1500);
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      setLoading(false);
    }
  };
  
  return (
    <AddProductContainer>
      <AddProductTitle>Anunciar Produto</AddProductTitle>
      
      <AddProductForm onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="title">Título do Anúncio</FormLabel>
          <FormInput 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="Ex: Garrafas PET" 
            required 
          />
        </FormGroup>
        
        <FormRow>
          <FormGroup>
            <FormLabel htmlFor="category">Categoria</FormLabel>
            <FormSelect 
              id="category" 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              required
            >
              <option value="">Selecione uma categoria</option>
              <option value="plasticos">Plásticos</option>
              <option value="metais">Metais</option>
              <option value="papel">Papel e Papelão</option>
              <option value="vidro">Vidro</option>
              <option value="eletronicos">Eletrônicos</option>
              <option value="texteis">Têxteis</option>
              <option value="outros">Outros</option>
            </FormSelect>
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="location">Localização</FormLabel>
            <FormInput 
              type="text" 
              id="location" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              placeholder="Ex: São Paulo, SP" 
              required 
            />
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <FormLabel htmlFor="price">Preço</FormLabel>
            <FormInput 
              type="text" 
              id="price" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              placeholder="Ex: R$ 2,50/kg" 
              required 
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="quantity">Quantidade Disponível</FormLabel>
            <FormInput 
              type="text" 
              id="quantity" 
              name="quantity" 
              value={formData.quantity} 
              onChange={handleChange} 
              placeholder="Ex: 15kg" 
              required 
            />
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <FormLabel htmlFor="description">Descrição</FormLabel>
          <FormTextarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Descreva seu produto em detalhes..." 
            required 
          />
        </FormGroup>
        
        <ImageUploadContainer>
          <FormLabel>Fotos do Produto</FormLabel>
          <UploadButton>
            Adicionar Fotos
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleImageUpload} 
            />
          </UploadButton>
          
          <ImagePreviewContainer>
            {formData.images.length > 0 ? (
              formData.images.map(img => (
                <ImagePreview key={img.id}>
                  <img src={img.url} alt="Preview" />
                  <button type="button" onClick={() => removeImage(img.id)}>✕</button>
                </ImagePreview>
              ))
            ) : (
              <div style={{ color: 'var(--text-light)' }}>
                Nenhuma imagem adicionada. Adicione até 5 fotos do seu produto.
              </div>
            )}
          </ImagePreviewContainer>
        </ImageUploadContainer>
        
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Publicando...' : 'Publicar Anúncio'}
        </SubmitButton>
      </AddProductForm>
    </AddProductContainer>
  );
};

export default AddProductPage;
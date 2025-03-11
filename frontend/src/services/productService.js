import api from './api';

const productService = {
  // Obter todos os produtos com filtros
  getProducts: async (filters = {}) => {
    return api.get('/products', { params: filters });
  },

  // Obter um produto específico por ID
  getProductById: async (id) => {
    return api.get(`/products/${id}`);
  },

  // Obter produtos de um usuário específico
  getUserProducts: async (userId) => {
    return api.get(`/products/user/${userId}`);
  },

  // Criar um novo produto
  createProduct: async (productData) => {
    return api.post('/products', productData);
  },

  // Atualizar um produto existente
  updateProduct: async (id, productData) => {
    return api.put(`/products/${id}`, productData);
  },

  // Excluir um produto
  deleteProduct: async (id) => {
    return api.delete(`/products/${id}`);
  },

  // Alterar o status de um produto (ativo, inativo, vendido)
  toggleProductStatus: async (id, status) => {
    return api.patch(`/products/${id}/status`, { status });
  },

  // Calcular impacto ambiental estimado
  calculateEnvironmentalImpact: (product) => {
    // Lógica para calcular o impacto ambiental com base no tipo de material
    // e quantidade do produto
    const impactFactors = {
      'plastico': { co2PerKg: 6, wastePerKg: 1 },
      'papel': { co2PerKg: 3, wastePerKg: 1 },
      'metal': { co2PerKg: 12, wastePerKg: 1 },
      'vidro': { co2PerKg: 0.8, wastePerKg: 1 },
      'eletronico': { co2PerKg: 20, wastePerKg: 1 },
      'textil': { co2PerKg: 15, wastePerKg: 1 },
      'madeira': { co2PerKg: 1.5, wastePerKg: 1 },
      'organico': { co2PerKg: 0.5, wastePerKg: 1 }
    };

    const category = product.category.toLowerCase();
    const quantity = product.quantity || 1;
    const weight = product.weight || 1; // em kg

    const factor = impactFactors[category] || { co2PerKg: 2, wastePerKg: 1 };
    
    return {
      co2Saved: factor.co2PerKg * weight * quantity,
      wasteReduced: factor.wastePerKg * weight * quantity
    };
  }
};

export default productService;
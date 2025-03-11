/**
 * Utility functions for formatting data in the EcoTrader application
 */

/**
 * Format currency values to the Brazilian Real format
 * @param {number} value - The value to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Format date to Brazilian format (DD/MM/YYYY)
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('pt-BR');
};

/**
 * Format weight values with unit
 * @param {number} weight - Weight value in kg
 * @returns {string} - Formatted weight string
 */
export const formatWeight = (weight) => {
  if (weight < 1) {
    return `${(weight * 1000).toFixed(0)}g`;
  }
  return `${weight.toFixed(2)}kg`;
};

/**
 * Calculate environmental impact metrics
 * @param {number} weight - Weight of recycled material in kg
 * @param {string} materialType - Type of material
 * @returns {object} - Environmental impact metrics
 */
export const calculateEnvironmentalImpact = (weight, materialType) => {
  // These are simplified calculations and should be replaced with more accurate data
  const impactFactors = {
    plastic: { co2: 2.5, water: 100, energy: 50 },
    paper: { co2: 1.1, water: 60, energy: 30 },
    metal: { co2: 4.0, water: 40, energy: 80 },
    glass: { co2: 0.8, water: 20, energy: 40 },
    wood: { co2: 0.5, water: 10, energy: 20 },
    textile: { co2: 3.0, water: 200, energy: 60 },
    electronic: { co2: 20.0, water: 300, energy: 200 },
  };

  const factor = impactFactors[materialType.toLowerCase()] || { co2: 1.0, water: 50, energy: 40 };
  
  return {
    co2Saved: (weight * factor.co2).toFixed(2), // kg of CO2
    waterSaved: (weight * factor.water).toFixed(0), // liters of water
    energySaved: (weight * factor.energy).toFixed(0), // kWh of energy
  };
};
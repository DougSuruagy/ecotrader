/**
 * Utility functions for data validation in the EcoTrader backend
 */

const Joi = require('@hapi/joi');

/**
 * Validation schema for user registration
 */
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    phone: Joi.string().pattern(/^\d{10,11}$/).required(),
    address: Joi.object({
      street: Joi.string().required(),
      number: Joi.string().required(),
      complement: Joi.string().allow(''),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().length(2).required(),
      zipCode: Joi.string().pattern(/^\d{8}$/).required()
    }).required(),
    userType: Joi.string().valid('individual', 'company', 'cooperative').required()
  });

  return schema.validate(data);
};

/**
 * Validation schema for user login
 */
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
  });

  return schema.validate(data);
};

/**
 * Validation schema for product creation
 */
const productValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(100).required(),
    description: Joi.string().min(10).max(1000).required(),
    category: Joi.string().valid(
      'plastic', 'metal', 'paper', 'glass', 'wood', 'textile', 'electronic', 'industrial', 'construction'
    ).required(),
    subcategory: Joi.string().max(50).required(),
    quantity: Joi.number().positive().required(),
    unit: Joi.string().valid('kg', 'g', 'ton', 'l', 'ml', 'unit').required(),
    price: Joi.number().min(0).required(),
    location: Joi.object({
      city: Joi.string().required(),
      state: Joi.string().length(2).required(),
      latitude: Joi.number().min(-90).max(90),
      longitude: Joi.number().min(-180).max(180)
    }).required(),
    images: Joi.array().items(Joi.string()).min(1).max(5).required(),
    condition: Joi.string().valid('new', 'used', 'recycled').required(),
    availableForExchange: Joi.boolean().required()
  });

  return schema.validate(data);
};

/**
 * Validation schema for transaction creation
 */
const transactionValidation = (data) => {
  const schema = Joi.object({
    productId: Joi.string().required(),
    sellerId: Joi.string().required(),
    buyerId: Joi.string().required(),
    quantity: Joi.number().positive().required(),
    totalPrice: Joi.number().min(0).required(),
    paymentMethod: Joi.string().valid('credit_card', 'bank_transfer', 'pix', 'exchange').required(),
    shippingAddress: Joi.object({
      street: Joi.string().required(),
      number: Joi.string().required(),
      complement: Joi.string().allow(''),
      neighborhood: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().length(2).required(),
      zipCode: Joi.string().pattern(/^\d{8}$/).required()
    }).required(),
    shippingMethod: Joi.string().valid('pickup', 'seller_delivery', 'courier').required()
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  productValidation,
  transactionValidation
};
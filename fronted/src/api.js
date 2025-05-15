// api.js
import axios from 'axios';

// Create axios instance with relative URL
const API = axios.create({
  baseURL: '/api', // relative URL, works with proxy and production
});

// Fetch all products
export const fetchProducts = async () => {
  const response = await API.get('/products');
  return response.data;
};

// Fetch single product by ID
export const fetchProductById = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};
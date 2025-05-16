import axios from 'axios';



const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
});

export const fetchProducts = async () => {
  try {
    const response = await API.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await API.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};
export const fetchReviewsByProductId = async (id) => {
  const response = await API.get(`/reviews/${id}`);
  return response.data;
};

// Named export to post a new review
export const postReview = async (id, reviewData) => {
  const response = await API.post(`/reviews/${id}`, reviewData);
  return response.data;
};
export default API;
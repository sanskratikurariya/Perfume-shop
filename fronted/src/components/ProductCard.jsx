// ProductCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// ProductCard component displays individual product info
function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg shadow hover:scale-105 hover:shadow-lg transition-transform duration-300 cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div className="overflow-hidden rounded-t-lg">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {product.description.length > 60
            ? product.description.substring(0, 60) + '...'
            : product.description}
        </p>
        <p className="text-pink-600 font-bold text-lg">${product.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;
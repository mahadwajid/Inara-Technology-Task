import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className="card p-4 cursor-pointer transform hover:scale-105 transition-all duration-200"
      onClick={handleCardClick}
    >
      <div className="aspect-square overflow-hidden rounded-lg mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              product.stock > 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
        
        <button 
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            product.stock > 0
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={product.stock === 0}
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click
            if (product.stock > 0) {
              // Handle add to cart logic here
              console.log('Add to cart:', product);
            }
          }}
        >
          {product.stock > 0 ? 'View Details' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
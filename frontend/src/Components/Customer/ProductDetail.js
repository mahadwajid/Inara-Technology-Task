import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../Hooks/useProducts';
import { sanitizeHtml } from '../../Utils/sanitize';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  
  const product = getProduct(id);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Back to Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <button
              onClick={() => navigate('/')}
              className="hover:text-blue-600 transition-colors"
            >
              Store
            </button>
          </li>
          <li>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </li>
          <li className="text-gray-900 font-medium truncate">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="100%" height="100%" fill="%23e5e7eb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="32">No Image</text></svg>';
            }}
          />
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-blue-600">
                RS{product.price.toFixed(2)}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                product.stock > 10
                  ? 'bg-green-100 text-green-800'
                  : product.stock > 0
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h2>
            <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.description) }} />
          </div>

          <div className="border-t pt-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900">Product ID:</span>
                <span className="ml-2 text-gray-600">#{product.id}</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Availability:</span>
                <span className={`ml-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              className={`flex-1 py-3 px-6 rounded-lg font-medium text-lg transition-colors ${
                product.stock > 0
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={product.stock === 0}
              onClick={() => {
                if (product.stock > 0) {
                  // Handle add to cart logic here
                  console.log('Add to cart:', product);
                  alert('Product added to cart! (Demo)');
                }
              }}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Store
            </button>
          </div>

          {/* Additional Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Product Information</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Free shipping on orders over RS100</li>
              <li>• 30-day return policy</li>
              <li>• 1-year manufacturer warranty</li>
              <li>• Customer support available 24/7</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
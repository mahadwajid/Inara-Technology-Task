import React, { useState, useMemo } from 'react';
import Pagination from '../Common/Pagination';
import Modal from '../UI/Modal';
import { PRODUCTS_PER_PAGE } from '../../Utils/constants';
import { sanitizeHtml } from '../../Utils/sanitize';

const ProductTable = ({ products, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, product: null });

  // Calculate pagination
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [products, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (product) => {
    setDeleteModal({ isOpen: true, product });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.product) {
      onDelete(deleteModal.product.id);
      setDeleteModal({ isOpen: false, product: null });
      // Reset to first page if current page becomes empty
      if (paginatedProducts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, product: null });
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8v.01M6 8v.01" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Products</h3>
          <p className="text-gray-500">Get started by adding your first product above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Products ({products.length})
        </h3>
      </div>

      {/* Mobile Cards View */}
      <div className="md:hidden">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="border-b border-gray-200 p-4">
            <div className="flex items-start space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="100%" height="100%" fill="%23e5e7eb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="8">No Image</text></svg>';
                }}
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-600">RS{product.price.toFixed(2)}</p>
                <p className="text-xs text-gray-500">Stock: {product.stock}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => onEdit(product)}
                  className="text-xs px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(product)}
                  className="text-xs px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="100%" height="100%" fill="%23e5e7eb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="8">No Image</text></svg>';
                    }}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-500 max-w-xs truncate" dangerouslySetInnerHTML={{ __html: sanitizeHtml(product.description) }} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  RS{product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    product.stock > 10 
                      ? 'bg-green-100 text-green-800'
                      : product.stock > 0
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock} units
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        confirmText="Delete"
        cancelText="Cancel"
      >
        <p className="text-gray-700">
          Are you sure you want to delete "{deleteModal.product?.name}"? 
          This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default ProductTable;
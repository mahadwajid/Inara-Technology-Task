import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import { useProducts } from '../../Hooks/useProducts';

const AdminDashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProduct = (productData) => {
    console.log('Adding product:', productData);
    addProduct(productData);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateProduct = (productData) => {
    console.log('Updating product:', productData);
    updateProduct(editingProduct.id, productData);
    setEditingProduct(null);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    console.log('Deleting product with id:', id);
    deleteProduct(id);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your products inventory
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            onCancel={handleCancelEdit}
            isEditing={!!editingProduct}
          />
        </div>

        <div className="lg:col-span-2">
          <ProductTable
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
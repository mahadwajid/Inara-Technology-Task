import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, SAMPLE_PRODUCTS } from '../Utils/constants';
import { toast } from 'react-toastify';

export const useProducts = () => {
  const [products, setProducts] = useLocalStorage(STORAGE_KEYS.PRODUCTS, SAMPLE_PRODUCTS);

  const addProduct = (productData) => {
    try {

     const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      
      const newProduct = {
        ...productData,
        id: nextId, 
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock, 10),
      };

      setProducts(prev => [...prev, newProduct]);
      toast.success('Product added successfully!');
      return newProduct;
    } catch (error) {
      toast.error('Failed to add product');
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = (id, productData) => {
    try {
      const updatedProduct = {
        ...productData,
        id,
        price: parseFloat(productData.price),
        stock: parseInt(productData.stock, 10),
      };

      setProducts(prev =>
        prev.map(product =>
          product.id === id ? updatedProduct : product
        )
      );
      toast.success('Product updated successfully!');
      return updatedProduct;
    } catch (error) {
      toast.error('Failed to update product');
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = (id) => {
    try {
      setProducts(prev => prev.filter(product => product.id !== id));
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete product');
      console.error('Error deleting product:', error);
    }
  };

  const getProduct = (id) => {
    return products.find(product => product.id === parseInt(id, 10));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
  };
};
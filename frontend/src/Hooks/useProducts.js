import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, SAMPLE_PRODUCTS } from '../Utils/constants';
import { toast } from 'react-toastify';
import { useLoading } from '../Context/LoadingContext';

export const useProducts = () => {
  const [products, setProducts] = useLocalStorage(STORAGE_KEYS.PRODUCTS, SAMPLE_PRODUCTS);
  const { showLoader, hideLoader } = useLoading();

  const addProduct = async (productData) => {
    try {
      showLoader();

      // Simulate async work
      await new Promise(r => setTimeout(r, 500));

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
    } finally {
      hideLoader();
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      showLoader();
      await new Promise(r => setTimeout(r, 500));
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
    } finally {
      hideLoader();
    }
  };

  const deleteProduct = async (id) => {
    try {
      showLoader();
      await new Promise(r => setTimeout(r, 500));
      setProducts(prev => prev.filter(product => product.id !== id));
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete product');
      console.error('Error deleting product:', error);
    } finally {
      hideLoader();
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
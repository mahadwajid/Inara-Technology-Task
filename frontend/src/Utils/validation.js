import * as Yup from 'yup';

export const productValidationSchema = Yup.object({
  name: Yup.string()
    .required('Product name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be greater than 0')
    .min(0.01, 'Price must be at least $0.01'),
  
  stock: Yup.number()
    .required('Stock is required')
    .integer('Stock must be a whole number')
    .min(0, 'Stock cannot be negative'),
  
  image: Yup.string()
    .required('Image URL is required')
    .url('Please enter a valid URL'),
  
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
});
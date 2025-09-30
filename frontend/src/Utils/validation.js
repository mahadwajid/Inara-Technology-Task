import * as Yup from 'yup';


const extractPlainText = (value) => {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, ' ')     
    .replace(/&nbsp;/gi, ' ')      
    .replace(/\s+/g, ' ')         
    .trim();
};

export const productValidationSchema = Yup.object({
  name: Yup.string()
    .required('Product name is required')
    .matches(/^[A-Za-z0-9 ]+$/, "Only letters, numbers, and spaces are allowed")
    .test("not-only-spaces", "Name cannot be empty or just spaces", (value) =>
      value && value.trim().length > 0
    )
    // must contain at least one letter
    .matches(/[A-Za-z]/, "Name must contain at least one letter")
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be greater than 0')
    .min(0.01, 'Price must be at least RS0.01'),
  
  stock: Yup.number()
    .required('Stock is required')
    .integer('Stock must be a whole number')
    .min(0, 'Stock cannot be negative'),
  
  image: Yup.string()
    .required('Image URL is required')
    .url('Please enter a valid URL'),
  
  description: Yup.string()
    .required('Description is required')
    .test(
      'not-empty-after-strip',
      'Description cannot be only spaces',
      (value) => extractPlainText(value).length > 0
    )
    .test(
      'min-plain-text',
      'Description must be at least 10 characters',
      (value) => extractPlainText(value).length >= 10
    )
    .test(
      'max-plain-text',
      'Description must be less than 500 characters',
      (value) => extractPlainText(value).length <= 500
    )
  

});

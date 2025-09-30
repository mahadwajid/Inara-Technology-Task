import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { productValidationSchema } from '../../Utils/validation';
import { INITIAL_PRODUCT } from '../../Utils/constants';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductForm = ({ product, onSubmit, onCancel, isEditing = false }) => {
  const initialValues = product || INITIAL_PRODUCT;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={productValidationSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          if (!isEditing) {
            resetForm();
          }
        }}
        enableReinitialize={true}
      >
        {({ isSubmitting, values, setFieldValue }) => (   // ✅ FIX: Destructure values + setFieldValue
          <Form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="input-field"
                  placeholder="Enter product name"
                />
                <ErrorMessage name="name" component="div" className="error-text" />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price (RS) *
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  min="0"
                  className="input-field"
                  placeholder="0.00"
                />
                <ErrorMessage name="price" component="div" className="error-text" />
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity *
                </label>
                <Field
                  type="number"
                  id="stock"
                  name="stock"
                  min="0"
                  className="input-field"
                  placeholder="0"
                />
                <ErrorMessage name="stock" component="div" className="error-text" />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL *
                </label>
                <Field
                  type="url"
                  id="image"
                  name="image"
                  className="input-field"
                  placeholder="https://example.com/image.jpg"
                />
                <ErrorMessage name="image" component="div" className="error-text" />
              </div>
            </div>

            {/* ✅ Rich Text Editor for Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <ReactQuill
                id="description"
                value={values.description}
                onChange={(content) => setFieldValue("description", content)}
                className="bg-white rounded-md"
              />
              <ErrorMessage name="description" component="div" className="error-text" />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              {isEditing && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50"
              >
                {isSubmitting 
                  ? (isEditing ? 'Updating...' : 'Adding...') 
                  : (isEditing ? 'Update Product' : 'Add Product')
                }
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProductForm;

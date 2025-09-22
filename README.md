# Inara Technology Task — Frontend

A simple React app that shows a product store for customers and an admin dashboard to manage products. Data is saved in the browser using localStorage (no backend).

## Features
- Customer Store: browse products, search, sort, and paginate
- Product Details: see full product information
- Admin Dashboard: add, edit, and delete products
- Form Validation: built with Formik + Yup
- Notifications: success/error toasts
- Styling: Tailwind CSS utility classes
- Currency: prices displayed in RS

## Tech Stack
- React 18 (Create React App)
- React Router
- Tailwind CSS
- Formik + Yup
- React Toastify

## Getting Started
1. Open a terminal in the `frontend` folder
2. Install dependencies:
   - `npm install`
3. Start the development server:
   - `npm start`
4. Open the app at `http://localhost:3000`

## Scripts (in `frontend`)
- `npm start` — run the app in development
- `npm run build` — build for production
- `npm test` — run tests

## Project Structure
```
frontend/
  src/
    Components/
      Admin/        # Admin pages (form, table)
      Customer/     # Storefront pages (list, detail)
      Common/       # Layout, Navbar, Pagination
      UI/           # Modal, LoadingSpinner
    Hooks/          # useLocalStorage, useProducts
    Utils/          # constants, validation
    App.js          # routes
```

## Data & Persistence
- Products are seeded from sample data on first load
- All changes are stored in browser localStorage under the key `products`



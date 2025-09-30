import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Layout from './Components/Common/Layout';
import LoadingSpinner from './Components/UI/LoadingSpinner';


const lazyWithDelay = (importer, delayMs = 400) =>
  lazy(() =>
    Promise.all([
      importer(),
      new Promise((resolve) => setTimeout(resolve, delayMs)),
    ]).then(([module]) => module)
  );

const AdminDashboard = lazyWithDelay(() => import('./Components/Admin/AdminDashboard'));
const CustomerStore = lazyWithDelay(() => import('./Components/Customer/CustomerStore'));
const ProductDetail = lazyWithDelay(() => import('./Components/Customer/ProductDetail'));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<LoadingSpinner text="Loading page..." fullScreen />}> 
          
          {/* Center loader on screen while route chunks load */}
          
          
          <Layout>
            <Routes>
              <Route path="/" element={<CustomerStore />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* id mean Dynamic route paramter */}
              <Route path="/product/:id" element={<ProductDetail />} /> 
            </Routes>
          </Layout>
        </Suspense>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
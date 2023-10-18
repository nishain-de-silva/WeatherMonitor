import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config.json'
import { getAuth } from 'firebase/auth';

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
import Dashboard from './pages/dashboard';
import Auth from './pages/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
const isAuthenticated = !!auth.currentUser

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isAuthenticated ?<Dashboard /> : <Auth />} />
        {isAuthenticated ? 
          <Route path='/home' element={<Dashboard />} /> :
          <Route path='/auth' element={<Auth />} />
        }
        <Route path='*' element={isAuthenticated ?<Dashboard /> : <Auth />} />
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // Assuming App2 is renamed correctly if it's from Home.js
import Home from './Home';  
import About from './About';  
import Donate from './Donate';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const handleMenuClick = (componentName) => {
    navigate('/' + componentName);
  };
  
  return (
      <div className="column">
          <p className='title'>
            ML Projects
          </p>
          <div className="center-column">
          <button className="menu-buttons" onClick={() => handleMenuClick('app')}>MNIST</button>
          <button className="menu-buttons" onClick={() => handleMenuClick('about')}>About</button>
          <button className="menu-buttons" onClick={() => handleMenuClick('donate')}>Donate</button>
          </div>
      </div>
  );
}

export default Home;

import React, { useState } from 'react';
import './About.css';
import { useNavigate, Link } from 'react-router-dom';

function About() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (componentName) => {
    navigate('/' + componentName);
    setMenuOpen(false); // Close the menu after navigation
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <button className="topbar-menu-title" onClick={() => handleMenuClick('')}>ML Projects</button>
        <div className="hamburger" onClick={toggleMenu}>
          &#9776; {/* Unicode character for the hamburger icon */}
        </div>
        {menuOpen && (
          <div className="dropdown-menu">
            <button className="topbar-menu-buttons" onClick={() => handleMenuClick('app')}>MNIST</button>
            <button className="topbar-menu-buttons" onClick={() => handleMenuClick('about')}>About</button>
            <button className="topbar-menu-buttons" onClick={() => handleMenuClick('donate')}>Donate</button>
          </div>
        )}
      </div>
      <div className="info-container">
        <p className="info-text">
            About Text Goes Here
        </p>
        <p className="info-text">
          I plan on working on more projects in the future and you can follow my work via my <a className="info-text-link" href="https://anthonyduncalf.substack.com/" target="_blank" rel="noopener noreferrer">substack</a> or on my <a className="info-text-link" href="https://www.anthonyduncalf.dev/" target="_blank" rel="noopener noreferrer">website</a>. If you would like to support me with my work, you can make a donation <Link className="info-text-link" to="/donate">here</Link>.
        </p>
      </div>
    </div>
  );
}

export default About;

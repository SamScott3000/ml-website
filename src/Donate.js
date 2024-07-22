import React, { useState } from 'react'; // Import useState from React
import './Donate.css';
import { useNavigate } from 'react-router-dom';
//import { loadStripe } from '@stripe/stripe-js';
//import { Elements } from '@stripe/react-stripe-js';
//import StripeDonationForm from './StripeDonationForm';

function Donate() {

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (componentName) => {
    navigate('/' + componentName);
    setMenuOpen(false); // Close the menu after navigation
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  //const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

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
      <div className="content-donate">
        {/*<Elements stripe={stripePromise}>
          <StripeDonationForm />  
        </Elements>*/}
        <div className="wallet-container-container">
          <div className="wallet-container">
            <img className="wallet-address" src="/Assets/Btc.jpg" alt="BTC Logo" />
            <img className="wallet-address" src="/Assets/Eth.jpg" alt="ETH Logo" />
            <img className="wallet-address" src="/Assets/Doge.jpg" alt="DOGE Logo" />
          </div>
          <div>
            <p className="wallet-text">BTC Address: bc1qqkvvghstgrffvrjm98qfl8nqfu347hapz5lf84</p>
            <p className="wallet-text">ETH Address: 0xFe9f79092b80533467566fe954FEF4DCA814cE41</p>
            <p className="wallet-text">DOGE Address: D6XPiFgcgjW8WD6zZP7qvEsgaa6bRhzxXP</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donate;

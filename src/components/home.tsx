import React from 'react';
import logo from '../apothecary.png';
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div>
        <img src={logo} className="App-logo" alt="logo" />
        <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/dilute-alcohol-calculator">Calculate ABV</Link>
          </li>
          <li>
            <Link to="/calculate-apothecary-cost">Calculate Apothecary Cost</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;

import React from 'react';
import { Route , Switch} from 'react-router-dom';
import DiluteAlcoholCalculator from './components/dilute-alcohol-calc';
import CalculateApothecaryCost from './components/calculate-apothecary-cost';
import VitaminCTitration from './components/vitamin-c-titration';
import Home from './components/home';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/dilute-alcohol-calculator' component={DiluteAlcoholCalculator} />
          <Route path='/calculate-apothecary-cost' component={CalculateApothecaryCost} />
          <Route path='/vit-c' component={VitaminCTitration} />
        </Switch>
      </header>
    </div>
  );
}

export default App;

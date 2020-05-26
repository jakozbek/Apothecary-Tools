import React from 'react';
import { Route , Switch} from 'react-router-dom';
import DiluteAlcoholCalculator from './components/dilute-alcohol-calc'
import Home from './components/home';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/dilute-alcohol-calculator' component={DiluteAlcoholCalculator} />
        </Switch>
      </header>
    </div>
  );
}

export default App;

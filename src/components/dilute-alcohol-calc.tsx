import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import abv from '../abv.png';

function DiluteAlcoholCalculator() {

  const [desiredVolume, setDesiredVolume] = useState(1000);
  const [desiredAbv, setDesiredAbv] = useState(40);
  const [currentAbv, setCurrentAbv] = useState(95);
  const [waterNeeded, setWaterNeeded] = useState(0);
  const [alcoholNeeded, setAlcoholNeeded] = useState(0);

  useEffect(() => {
    const alcoholNeeds = ((desiredAbv / 100) * desiredVolume) / (currentAbv / 100);
    setAlcoholNeeded(alcoholNeeds);

    const waterNeeds = desiredVolume - alcoholNeeds;
    setWaterNeeded(waterNeeds)
  }, [desiredVolume, desiredAbv, currentAbv])

  return (
    <div>
      <img src={abv} alt=""/>
      <h2>Tincture ABV Calculator</h2>
      <p>Enter the values below to calculate what you'll need for your tincture.</p>
      <p>
        Mixture: <br/>
        Water Needed: {waterNeeded.toFixed(2)} mL <br />
        Alcohol Needed: {alcoholNeeded.toFixed(2)} mL
      </p>
      <form>
        Enter Values: <br/>
        <label>Current ABV (%) : </label>
        <input
          type="number"
          value={currentAbv}
          onChange={
            event => setCurrentAbv(Number(event.target.value))
          }>
        </input> <br></br>

        <label>Desired ABV (%) : </label>
        <input
          type="number"
          value={desiredAbv}
          onChange={
            event => setDesiredAbv(Number(event.target.value))
          }>
        </input> <br></br>

        <label>Desired Volume (mL) : </label>
        <input
          type="number"
          value={desiredVolume}
          onChange={
            event => setDesiredVolume(Number(event.target.value))
            }>
        </input>
      </form>
            <br/>
      <Link to="/">Home</Link>
    </div>
  );
}

export default DiluteAlcoholCalculator;

import React, { useState, useEffect } from 'react';

const VitaminCTitration = (): JSX.Element => {
  const [drops, setDrops] = useState(0);
  const [vitCmgG, setVitCmg] = useState(0);
  const [materialWeight, setMaterialWeight] = useState(0);

  const iodineMolarity = 0.084;
  const vitCgPerMol = 176.12;
  const litersPerDrop = 0.00005;

  useEffect(() => {
    const molVitC = iodineMolarity * (litersPerDrop * drops);

    const gramsVitC = molVitC * vitCgPerMol;

    setVitCmg((gramsVitC * 10000) / materialWeight);
  }, [setVitCmg, drops, materialWeight]);

  return (
    <>
      <h1>Vitamin C Titration Calculator</h1>
      <p>
        This application assumes that you are using a 2% concentration Lugol's
        Solution
        <br />
        <a
          href="https://kit.co/feralforaging/vitamin-c-titration"
          rel="noopener noreferrer"
          target="_blank"
        >
          Click to buy supplies
        </a>
      </p>

      <p>Enter data to see your results</p>
      <label htmlFor="drops">
        {' '}
        Drops Needed:
        <input
          name="drops"
          type="text"
          value={drops}
          onChange={(e) => setDrops(Number(e.target.value))}
        />
      </label>

      <label htmlFor="material-weight">
        Material Weight (g)
        <input
          type="text"
          name="material-weight"
          value={materialWeight}
          onChange={(e) => setMaterialWeight(Number(e.target.value))}
        />
      </label>

      <p>Results:</p>

      {materialWeight > 0 && drops > 0 && (
        <div>
          <p>
            {vitCmgG.toFixed(2)}
            mg/100g
          </p>
        </div>
      )}
    </>
  );
};

export default VitaminCTitration;

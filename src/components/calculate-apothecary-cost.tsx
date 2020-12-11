/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import Papa from 'papaparse';

const CalculateApothecaryCost = (): JSX.Element => {
  let csvFile: File;
  let csvFileContents: string;
  const [totalCost, setTotalCost] = useState(0);

  interface plantEntry {
    name: string;
    unitPrice: number;
    extractRatio: number;
    extractSolventAbv: number;
    tinctureVolumeNeeded: number;
  }

  let plantRows: Array<plantEntry>;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // check if null
    if (event.target.files![0]) [csvFile] = event.target.files!;
  };

  // TODO: handle when there is no file
  const handleCsvUpload = () => {
    const fileReader = new FileReader();

    fileReader.addEventListener('load', (event) => {
      csvFileContents = event.target!.result as string;

      const parsedCsv = Papa.parse(csvFileContents);

      const parsedArray: Array<any> = parsedCsv.data;

      plantRows = parsedArray.map((row: Array<any>) => {
        const name: string = row[0];
        const unitPrice = Number(row[1].replace('$', ''));
        const extractRatio = Number(row[2]);

        return {
          name,
          unitPrice,
          extractRatio,
          extractSolventAbv: row[3],
          tinctureVolumeNeeded: row[4],
        } as plantEntry;
      });

      // remove the first entry of the array
      plantRows.shift();
    });

    fileReader.readAsText(csvFile);
  };

  const handleCalculateCost = () => {
    // TODO - fix this
    let totalCost = 0;

    plantRows.forEach((row) => {
      let rowCost = 0;
      const herbNeeded =
        (1 / row.extractRatio) * row.tinctureVolumeNeeded * 8.35;

      if (row.extractRatio === 0) {
        // TODO: handle without console.error
        console.error('Enter correct extract ratio');
        return;
      }

      rowCost = herbNeeded * row.unitPrice;

      if (!Number.isNaN(rowCost)) totalCost += rowCost;
      // TODO: handle without console
      else console.error('NaN found, check your rows');
    });
    setTotalCost(totalCost);
  };

  return (
    <>
      <input type="file" id="input" onChange={handleFileChange} accept=".csv" />
      <button type="button" onClick={handleCsvUpload}>
        Upload CSV
      </button>
      <button type="button" onClick={handleCalculateCost}>
        Calculate Cost
      </button>
      ${totalCost}
    </>
  );
};

export default CalculateApothecaryCost;

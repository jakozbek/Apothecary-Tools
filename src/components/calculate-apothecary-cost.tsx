import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

function CalculateApothecaryCost() {
    let csvFile:File;
    let csvFileContents:string;
    const [totalCost, setTotalCost] = useState(0);

    interface plantEntry {
        name:string,
        unitPrice: number,
        extractRatio: number,
        extractSolventAbv: number,
        tinctureVolumeNeeded: number
    }

    let plantRows:Array<plantEntry>;
    
    let handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // check if null
        if (event.target.files![0] )
            csvFile = event.target.files![0];
    }

    // TODO: handle when there is no file
    const handleCsvUpload = () => {
        const fileReader = new FileReader();

        fileReader.addEventListener('load', event => {
            console.log(typeof (event.target?.result));
            csvFileContents = event.target!.result as string;

            const parsedCsv = Papa.parse(csvFileContents);

            const parsedArray:Array<any> = parsedCsv.data;

            plantRows = parsedArray.map( (row:Array<any>) => {
                let name:string = row[0];
                let unitPrice: number;
                let extractRatio: number;

                unitPrice = Number(row[1].replace('$', ''));
                extractRatio = Number(row[2])

                return {
                    name,
                    unitPrice,
                    extractRatio,
                    extractSolventAbv: row[3],
                    tinctureVolumeNeeded: row[4],
                } as plantEntry
            });

            // remove the first entry of the array
            plantRows.shift();
        });

        fileReader.readAsText(csvFile);
    }

    const handleCalculateCost = () => {
        console.log('handle calculate cost');
        console.log(plantRows)
        let totalCost: number = 0;

        plantRows.forEach( row => {
            let rowCost: number = 0;
            let herbNeeded:number;

            if (row.extractRatio === 0) {
                console.error("Enter correct extract ratio");
                return;
            }

            herbNeeded = 1/row.extractRatio * row.tinctureVolumeNeeded *8.35;
            rowCost = herbNeeded * row.unitPrice;

            if (! Number.isNaN(rowCost))
                totalCost = totalCost + rowCost;
            else
                console.error("NaN found, check your rows");
        });
        setTotalCost(totalCost);
        console.log(totalCost)
    }

   return (
       <div>
        <input type="file" id="input" onChange={handleFileChange} accept=".csv"></input>

        <button onClick={handleCsvUpload}>Upload CSV</button>
        <button onClick={handleCalculateCost}>Calculate Cost</button>

        <p>${totalCost}</p>
       </div>
   ) 
}

export default CalculateApothecaryCost;
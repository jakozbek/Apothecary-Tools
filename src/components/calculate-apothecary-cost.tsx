import React from 'react';
import Papa from 'papaparse';

function CalculateApothecaryCost() {
    let csvFile:File;
    let csvFileContents:string;

    // let plantEntry = {
    //     name:string,
    //     price,
    //     ratio,
    //     bestAbv,
    //     amntTinctureNeeded
    // }

    let handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // check if null
        if (event.target.files![0] )
            csvFile = event.target.files![0];
    }

    const handleCsvUpload = () => {
        console.log(csvFile);
        const fileReader = new FileReader();
        fileReader.addEventListener('load', event => {
            console.log(typeof (event.target?.result));
            csvFileContents = event.target!.result as string;

            const parsedCsv = Papa.parse(csvFileContents);

            const parsedArray:Array<any> = parsedCsv.data;

            let plantInfo = parsedArray.map( (row:Array<any>) => {
                return {
                    "name": row[0],
                    "unitPrice": row[1],
                    "extractRatio": row[2],
                    "extractSolventAbv": row[3],
                    "tinctureVolumeNeeded": row[3],
                }
            });

            // remove the first entry of the array
            plantInfo.shift();
        });

        fileReader.readAsText(csvFile);
    }

   return (
       <div>
        <input type="file" id="input" onChange={handleFileChange} accept=".csv"></input>

        <button onClick={handleCsvUpload}>Upload CSV</button>
       </div>
   ) 
}

export default CalculateApothecaryCost;
// components/ExcelReader.js
import React, { useState } from 'react';
import { read, utils } from "xlsx";



const ExcelReader = () => {
    const [file, setFile] = useState(null);
    const [formattedData, setFormattedData] = useState([]);
    const headers = ['title', 'firstName', 'middleName', 'lastName', 'aadharNumber', 'rollNumber', 'batchMonth', 'batchNo']
    const handleFileChange = (e) => {
        console.log("Hello");
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log(selectedFile);
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target.result;
            const workbook = read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = utils.sheet_to_json(sheet, { header: 1 });

            const headers = jsonData[0];
           
            const formattedData = jsonData.slice(1).map(row => {
                const obj = {};
                for (let i = 0; i < headers.length; i++) {
                    obj[headers[i]] = row[i] ? row[i] : "";
                }
                
                return obj;
            });
            console.log(formattedData);
            setFormattedData(formattedData);
        };

        reader.readAsBinaryString(selectedFile);
    };

    const handleUpload = async () => {
       let res = await fetch('/api/user/bulk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({formattedData})
        });
        console.log(res);
        let data = await res.json();
        console.log(data);
        // const res = await
    };
    
    return (
        <div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} onClick={() => {setFile(null); setFormattedData(null)} }/>
            <button onClick={handleUpload}>Upload All</button>
            <table>
            
            
            </table>
        </div>
    );
};

export default ExcelReader;

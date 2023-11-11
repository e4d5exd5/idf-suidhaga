// components/ExcelReader.js
import React, { useState } from 'react';
import { read, utils } from "xlsx";




const ExcelReader = () => {
    const [file, setFile] = useState(null);
    const [formattedData, setFormattedData] = useState([]);
    const headers = ['title', 'firstName', 'middleName', 'lastName', 'mobile', 'aadharNumber', 'rollNumber', 'batchMonth', 'batchNo']
    const handleFileChange = (e) => {
        console.log("Hello");
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log(selectedFile);
        let headers
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = event.target.result;
            const workbook = read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = utils.sheet_to_json(sheet, { header: 1 });

            headers = jsonData[0];

            const formattedData = jsonData.slice(1).map(row => {
                const obj = {};
                for (let i = 0; i < headers.length; i++) {
                    obj[headers[i]] = row[i] ? row[i] : "";
                }

                return obj;
            });
            console.log(headers);
            console.log(formattedData);
            setFormattedData(formattedData);
        };

        reader.readAsBinaryString(selectedFile);
        console.log(headers);
    };

    const handleUpload = async () => {
        let res = await fetch('/api/user/bulk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ formattedData })
        });
        console.log(res);
        let data = await res.json();
        console.log(data);
        // const res = await
    };

    return (
        <div>
            <div className="flex justify-between items-center p-4">
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    onClick={() => {
                        setFile(null);
                        setFormattedData(null);
                    }}
                    className="mr-2"
                />
                <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Upload All
                </button>
            </div>
            {
                formattedData?.length > 0 && (
                    <table className="w-full border-collapse border border-gray-300 mt-4">
                        <thead>
                            <tr className="bg-gray-200">
                                {headers.map((header, index) => (
                                    <th key={index} className="p-2 font-bold text-center border border-gray-300">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {formattedData.map((row, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    {headers.map((header, index) => (
                                        <td key={index} className="p-2 border-t border border-gray-300 text-center">{row[header]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }

        </div>
    );
};

export default ExcelReader;

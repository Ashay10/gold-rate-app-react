// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import axios from 'axios'; // Import Axios library

function App() {
  const [currency, setCurrency] = useState('INR');
  const [carat, setCarat] = useState('24');
  const [goldRate, setGoldRate] = useState(null);

  useEffect(() => {
    // Define the API URL with dynamic currency and date
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    console.log(currentDate)
    const apiUrl = `https://www.goldapi.io/api/XAU/${currency}/20230911`;

    // Set the headers for the API request
    const headers = {
      'x-access-token': 'goldapi-fl85rlmfn2oe8-io',
      'Content-Type': 'application/json',
    };

    // Fetch data from the API
    axios.get(apiUrl, { headers })
      .then(response => {
        setGoldRate(response.data.price_gram_24k); // Adjust the field as needed
        console.log(response)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [currency]);

  return (
    <div className="App">
      <Header />
      
      {goldRate !== null && (
        <div className="gold-rate-card">
          <div className="coin-logo"></div>
          <div className="rate">{goldRate} INR per gram</div>
        </div>
      )}
      <div className="dropdowns input-fields">
        <select
          className="dropdown input"
          id="currency-dropdown"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="INR">INR</option>
          {/* Add more currency options here */}
        </select>
        <select
          className="dropdown input"
          id="carat-dropdown"
          value={carat}
          onChange={(e) => setCarat(e.target.value)}
        >
          <option value="24">24 Carat</option>
          <option value="22">22 Carat</option>
          {/* Add more carat options here */}
        </select>
      </div>
      <div className="input-fields">
        <input type="text" placeholder="Amount" className="input" />
        <input type="text" placeholder="Weight (grams)" className="input" />
      </div>
    </div>
  );
}

export default App;

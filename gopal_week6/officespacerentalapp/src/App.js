import React from 'react';
import './App.css';
import officeImage from './office.svg';

function App() {
  // Object to display details of a single featured office
  const office = {
    name: 'Prestige Business Park',
    rent: 55000,
    address: 'MG Road, Bangalore'
  };

  // List of objects to loop through and display more office spaces
  const officeSpaces = [
    { name: 'Prestige Business Park', rent: 55000, address: 'MG Road, Bangalore' },
    { name: 'DLF Cyber City', rent: 75000, address: 'Sector 24, Gurugram' },
    { name: 'RMZ Ecoworld', rent: 62000, address: 'Bellandur, Bangalore' },
    { name: 'One BKC', rent: 95000, address: 'Bandra Kurla Complex, Mumbai' },
    { name: 'Tidel Park', rent: 48000, address: 'Taramani, Chennai' }
  ];

  // Demonstrates React.createElement() directly, without JSX syntax
  const footerNote = React.createElement(
    'p',
    { className: 'footer-note' },
    'This footer line was created using React.createElement() instead of JSX.'
  );

  return (
    <div className="App">
      {/* Element created using JSX */}
      <h1>Office Space Rental Listings</h1>

      {/* Attribute usage: src attribute on an <img> element */}
      <img src={officeImage} alt="Office Space" width="300" />

      {/* Object rendering using JavaScript expressions inside JSX */}
      <div className="office-detail">
        <h2>Featured Office</h2>
        <p>Name: {office.name}</p>
        {/* Inline CSS in JSX: red if rent is below 60000, green otherwise */}
        <p style={{ color: office.rent < 60000 ? 'red' : 'green', fontWeight: 'bold' }}>
          Rent: Rs. {office.rent}
        </p>
        <p>Address: {office.address}</p>
      </div>

      {/* Looping through a list of objects using map() inside JSX */}
      <h2>All Available Office Spaces</h2>
      <ul className="office-list">
        {officeSpaces.map((item, index) => (
          <li key={index}>
            <span className="office-name">{item.name}</span> —{' '}
            <span
              className="office-rent"
              style={{ color: item.rent < 60000 ? 'red' : 'green' }}
            >
              Rs. {item.rent}
            </span>{' '}
            — {item.address}
          </li>
        ))}
      </ul>

      {footerNote}
    </div>
  );
}

export default App;

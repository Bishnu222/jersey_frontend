import React from 'react';
import './Homepage.css';
import backgroundImage from '../assets/home.png'; // adjust path if needed

export default function Homepage() {
  return (
    <div
      className="homepage"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
    </div>
  );
}

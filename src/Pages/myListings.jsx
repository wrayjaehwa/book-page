
import React, { useState } from 'react';
import { auth } from '../firebase';
import '../App.css'; // Import CSS file for styling
import './myListings.css'; // Import CSS file for styling
import Title from '../Components/Title'; // Title component


const MyListings = () => {
  return (
    <div className="app">
      <Title />
      <div className="listing-page-body">
        <div>My Listings</div>
        <div>Inbox</div>
      </div>
    </div>
  );
};

export default MyListings;

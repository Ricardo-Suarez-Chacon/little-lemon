import React from 'react';
import '../Css/ConfirmedBooking.css';
// Define the ConfirmedBooking component
const ConfirmedBooking = () => {
  return (
    <main className="confirmed-booking" aria-labelledby="confirmationMessage">
        <h1 id="confirmationMessage" className="confirmation-message">Your booking has been confirmed!</h1>
    </main>
  );
};

export default ConfirmedBooking;
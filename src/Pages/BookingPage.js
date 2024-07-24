import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "../Components/BookingForm";
import '../Css/BookingPage.css';
import { fetchAPI, submitAPI } from '../API/BookingApi';


const initializeTimes =  initialAvailableTimes => {
    const fetchedTimes =  fetchAPI(new Date());
    return [...initialAvailableTimes, ...fetchedTimes];
};

const updateTimes = (availableTimes, date) => {
    const response = fetchAPI(new Date(date));
    return (response.length !== 0) ? response : availableTimes;
  };


const BookingPage = (props) => {
    const [ availableTimes, dispatch ] = useReducer(updateTimes, [], initializeTimes);

      const navigate = useNavigate();

      const submitData = formData => {
        localStorage.setItem('Reservation', JSON.stringify(formData));
        const response = submitAPI(formData);
        if (response === true) {
            navigate('/confirmed-booking'); // Navigate to the booking confirmed page
        } else {
            // Handle submission error (not shown here)
        }

      };


      return (
        <>
            <main id="main-content" aria-labelledby="main-heading">
                <header>
                    <h1 id="main-heading">Reservations</h1>
                </header>
                <article aria-labelledby="form-heading" className="reservation-form">
                    <BookingForm
                        className="booking-form"
                        availableTimes={availableTimes}
                        dispatch={dispatch}
                        submitData={submitData}
                    />
                </article>
            </main>
        </>
    );
}

export default BookingPage;
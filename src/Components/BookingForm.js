// This is a React component named BookingForm.
// It imports React, useState, useEffect hooks, and a CSS file for styling.

// The BookingForm component accepts props and initializes state for form data, form validity, and error messages.
// It uses useState to manage state for formData, isFormValid, and errorMessages.

// The validateForm function validates the form data:
// - Checks if the date is selected and is today or in the future.
// - Validates the time selection.
// - Ensures the number of guests is between 1 and 10.
// - Checks if an occasion is selected.
// - Updates the errorMessages and isFormValid state based on validation.

// The useEffect hook is used to validate the form whenever formData changes.

// The handleChange function updates the formData state when input values change.

// The handleSubmit function prevents the default form submission behavior and calls props.submitData with formData if the form is valid.

// The component returns a form element with inputs for date, time, number of guests, and occasion selection.
// It also displays error messages for each field if there are validation errors and disables the submit button if the form is not valid.

// The component is exported as BookingForm.

import React, { useState, useEffect } from "react";
import '../Css/BookingForm.css';

const BookingForm = (props) => {
    const [formData, setForm] = useState({
        'date': '',
        'time': '',
        'guests': '',
        'occasion': ''
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessages, setErrorMessages] = useState({
        date: '',
        time: '',
        guests: '',
        occasion: ''
    });

    const validateForm = () => {
        let isValid = true;
        let errors = { date: '', time: '', guests: '', occasion: ''

         };

        if (!formData.date) {
            errors.date = 'Please select a date.';
            isValid = false;
        } else {
            const now = new Date();
            const dateParts = formData.date.split('-');
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1;
            const day = parseInt(dateParts[2], 10);
            const selectedDate = new Date(year, month, day);
            selectedDate.setHours(0, 0, 0, 0);
            now.setHours(0, 0, 0, 0);

            if (selectedDate < now) {
                errors.date = 'Date must be today or in the future.';
                isValid = false;
            }
        }

        if (!formData.time) {
            errors.time = 'Please select a time.';
            isValid = false;
        }

        const guests = parseInt(formData.guests, 10);
        if (isNaN(guests) || guests < 1 || guests > 10) {
            errors.guests = 'Number of guests must be between 1 and 10.';
            isValid = false;
        }

        if (!formData.occasion) {
            errors.occasion = 'Please select an occasion.';
            isValid = false;
        }
    
        setErrorMessages(errors);
        setIsFormValid(isValid);
    };

    useEffect(() => {
        validateForm();
    }, [formData]);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            props.submitData(formData);
        }
    };

    return (
        <form className="form" aria-labelledby="reservationFormLabel" onSubmit={handleSubmit}>
            <h2 id="reservationFormLabel" style={{ display: "none" }}>Reservation Form</h2>
            <label htmlFor="res-date">Choose date</label>
            <input className="input"
                   type="date"
                   id="res-date"
                   value={formData.date}
                   onChange={(e) => handleChange('date', e.target.value)}
                   aria-required="true"
                   aria-describedby="date-error"
                   aria-invalid={errorMessages.date !== ''}
                   required />
            <div id="date-error" aria-live="polite" role="alert" className="error">
                {errorMessages.date && <span >{errorMessages.date}</span>}
            </div>

            <label htmlFor="res-time">Choose time</label>
            <select className="select"
                    id="res-time"
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    aria-required="true"
                    aria-describedby="time-error"
                    aria-invalid={errorMessages.time !== ''}
                    required>
                {props.availableTimes.map((timeOption, index) => (
                    <option key={index} value={timeOption}>{timeOption}</option>
                ))}
            </select>
            <div id="time-error" aria-live="polite" role="alert" className="error">
                {errorMessages.time && <span>{errorMessages.time}</span>}
            </div>

            <label htmlFor="guests">Number of guests</label>
            <input className="input"
                   type="number"
                   placeholder="0"
                   min="1"
                   max="10"
                   id="guests"
                   value={formData.guests}
                   onChange={(e) => handleChange('guests', e.target.value)}
                   aria-required="true"
                   aria-describedby="guest-error"
                   aria-invalid={errorMessages.guests !== ''}
                   required />
            <div id="guest-error" aria-live="polite" role="alert" className="error">
                {errorMessages.guests && <span>{errorMessages.guests}</span>}
            </div>

            <label htmlFor="occasion">Occasion</label>
            <select className="select"
                    id="occasion"
                    value={formData.occasion}
                    onChange={(e) => handleChange('occasion', e.target.value)}
                    aria-required="true"
                    requerided>
                <option value="">Select Occasion</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
            </select>
            <div aria-live="polite" role="alert" className="error">
                {errorMessages.occasion && <span>{errorMessages.occasion}</span>}
            </div>

            <input className="submitButton"
                    type="submit"
                    value="Make Your reservation"
                    disabled={!isFormValid}
                    aria-label="On Click, make your reservation"
                />
        </form>
    );
}

export default BookingForm;
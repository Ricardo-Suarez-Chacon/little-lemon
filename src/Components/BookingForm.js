import React, { useState } from "react";
import '../Css/BookingForm.css';

const BookingForm = (props) => { // Step 1: Add submitForm to props
    console.log("PROPS!!!", props )
    const [formData, setForm] = useState({
        'date': '',
        'time': '',
        'guests': '',
        'occasion': ''
    })


    // Create a form submission handler
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        props.submitData(formData); // Call submitData with the collected formData
    };

    return (
        // Attach the handleSubmit function to the form's onSubmit event
        <form className="form" aria-labelledby="reservationFormLabel" onSubmit={handleSubmit}>
            <h2 id="reservationFormLabel" style={{ display: "none" }}>Reservation Form</h2>
            <label htmlFor="res-date">Choose date</label>
            <input  className="input"
                    type="date"
                    id="res-date"
                    value={formData.date}
                    onChange={(e) =>{
                        setForm({...formData, date:e.target.value})
                        }
                    }
                    aria-required="true" />
            <label htmlFor="res-time">Choose time</label>
            <select className="select"
                    id="res-time"
                    value={formData.time}
                    onChange={(e) =>{
                        setForm({...formData, time:e.target.value})
                        }
                    }
                    aria-required="true">
                {props.availableTimes.map((timeOption, index) => (
                    <option key={index} value={timeOption}>{timeOption}</option>
                ))}
            </select>
            <label htmlFor="guests">Number of guests</label>
            <input  className="input" 
            type="number" 
            placeholder="1" 
            min="1" 
            max="10" 
            id="guests" 
            value={formData.guests} 
            onChange={(e) =>{
                setForm({...formData, guests:e.target.value})
                }
            }
            aria-required="true" />
            <label htmlFor="occasion">Occasion</label>
            <select className="select" 
                    id="occasion" 
                    value={formData.occasion} 
                    onChange={(e) =>{
                        setForm({...formData, occasion:e.target.value})
                        }
                    }
                    aria-required="false">
                <option value="">Select Occasion</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
            </select>
            <input className="submitButton" type="submit" value="Make Your reservation" />
        </form>
    );
}
export default BookingForm;
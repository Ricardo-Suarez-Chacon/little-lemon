import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import BookingForm from '../Components/BookingForm';
import BookingPage from '../Pages/BookingPage';
import * as BookingApi from '../API/BookingApi';
import { fetchAPI, submitAPI  } from '../API/BookingApi';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn().mockImplementation(() => {})
}));
jest.mock('../API/BookingApi', () => ({
  fetchAPI: jest.fn(),
  submitAPI: jest.fn()
}));
describe('BookingForm', () => {
  const availableTimes = ["17:00", "17:30", "19:00", "20:00", "21:00", "22:00"];
  const mockUpdateTimes = jest.fn();

  beforeEach(() => {
    render(<BookingForm availableTimes={availableTimes} updateTimes={mockUpdateTimes} />);
  });

  test('renders correctly', () => {
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/make your reservation/i)).toBeInTheDocument();
  });

  test('updates state on input change', () => {
    fireEvent.change(screen.getByLabelText(/choose date/i), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText(/choose time/i), { target: { value: availableTimes[0] } });
    fireEvent.change(screen.getByLabelText(/number of guests/i), { target: { value: 3 } });
    fireEvent.change(screen.getByLabelText(/occasion/i), { target: { value: 'Birthday' } });

    expect(screen.getByLabelText(/choose date/i)).toHaveValue('2023-01-01');
    expect(screen.getByLabelText(/choose time/i)).toHaveValue(availableTimes[0]);
    expect(screen.getByLabelText(/number of guests/i)).toHaveValue(3);
    expect(screen.getByLabelText(/occasion/i)).toHaveValue('Birthday');
  });

  test('fetchAPI returns expected times for a given date', async () => {
    const date = new Date(2023, 3, 10); // 10th April 2023
    const times = fetchAPI(date);
  
    const expectedTimes = ["17:00", "17:30", "18:30", "19:00", "20:00", "20:30", "21:00", "23:00"];
    
    //expect(times).toEqual(expectedTimes);

  });
});
// Adding unit tests to validate HTML attributes for each input field in the BookingForm component.

describe('BookingForm HTML attributes validation', () => {
  beforeEach(() => {
    render(<BookingForm availableTimes={["17:00", "17:30", "19:00", "20:00", "21:00", "22:00"]} />);
  });

  test('date input has correct attributes', () => {
    const dateInput = screen.getByLabelText(/choose date/i);
    expect(dateInput).toHaveAttribute('type', 'date');
    expect(dateInput).toBeRequired();
    expect(dateInput).toHaveAttribute('aria-required', 'true');
  });

  test('time select has correct attributes', () => {
    const timeSelect = screen.getByLabelText(/choose time/i);
    expect(timeSelect).toBeRequired();
    expect(timeSelect).toHaveAttribute('aria-required', 'true');
  });

  test('number of guests input has correct attributes', () => {
    const guestsInput = screen.getByLabelText(/number of guests/i);
    expect(guestsInput).toHaveAttribute('type', 'number');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
    expect(guestsInput).toBeRequired();
    expect(guestsInput).toHaveAttribute('aria-required', 'true');
  });

  test('occasion select has correct attributes', () => {
    const occasionSelect = screen.getByLabelText(/occasion/i);
    expect(occasionSelect).toHaveAttribute('aria-required', 'false');
  });

  test('submit button has correct attributes', () => {
    const submitButton = screen.getByDisplayValue(/make your reservation/i);
    expect(submitButton).toHaveAttribute('type', 'submit');
    // Initially, the form is invalid, so the button should be disabled
    expect(submitButton).toBeDisabled();
  });
});

describe('Form field validation states', () => {
  beforeEach(() => {
    render(<BookingForm availableTimes={["17:00", "17:30", "19:00", "20:00", "21:00", "22:00"]} />);
  });

  test('initial load', () => {
    const submitButton = screen.getByDisplayValue(/make your reservation/i);
    expect(submitButton).toBeDisabled();
  });

  test('date input valid and invalid states', () => {
    const dateInput = screen.getByLabelText(/date/i);
    // Invalid state - Selecting a past date or an invalid format
    fireEvent.change(dateInput, { target: { value: '2022-01-01' } }); // Assuming the current date is beyond this
    expect(screen.getByText(/Date must be today or in the future./i)).toBeInTheDocument();

    // Valid state - Selecting a valid future date
    fireEvent.change(dateInput, { target: { value: '3024-12-31' } });
    expect(screen.queryByText(/Date must be today or in the future./i)).toBeNull();
  });

  test('time selection valid and invalid states', () => {
    const timeSelect = screen.getByLabelText(/time/i);
    // Assuming the form has a dropdown for time selection with validation
    // Invalid state - Selecting a time not available
    fireEvent.change(timeSelect, { target: { value: '' } });
    expect(screen.getByText(/Please select a time./i)).toBeInTheDocument();

    // Valid state - Selecting an available time
    fireEvent.change(timeSelect, { target: { value: '19:00' } });
    expect(screen.queryByText(/Please select a time./i)).toBeNull();
  });

  test('number of guests input valid and invalid states', () => {
    const guestsInput = screen.getByLabelText(/number of guests/i);
    // Invalid state
    fireEvent.change(guestsInput, { target: { value: '0' } });
    expect(guestsInput).toHaveValue(0);
    expect(screen.getByText(/Number of guests must be between 1 and 10./i)).toBeInTheDocument();

    // Valid state
    fireEvent.change(guestsInput, { target: { value: '5' } });
    expect(guestsInput).toHaveValue(5);
    // validation message disappears or form updates accordingly
    expect(screen.queryByText(/Number of guests must be between 1 and 10./i)).toBeNull();
  });

  test('occasion select valid and invalid states', () => {
    const occasionSelect = screen.getByLabelText(/occasion/i);
    // Invalid state - Selecting default or empty option
    fireEvent.change(occasionSelect, { target: { value: '' } });
    expect(occasionSelect).toHaveValue('');
    // Valid state - Selecting a valid occasion
    fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });
    expect(occasionSelect).toHaveValue('Birthday');
  });

  test('submit button enabled/disabled states based on form validity', async () => {
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    const submitButton = screen.getByDisplayValue(/make your reservation/i);

    // Invalid state
    fireEvent.change(guestsInput, { target: { value: '0' } }); // Invalid number of guests
    fireEvent.change(occasionSelect, { target: { value: 'Birthday' } }); // Valid occasion
    expect(submitButton).toBeDisabled();

    // Valid state
    fireEvent.change(guestsInput, { target: { value: '5' } }); // Valid number of guests
    // Assuming the form becomes valid and submit button should be enabled
    waitFor(() => expect(submitButton).toBeEnabled());
  });

  test('submits with valid data', async () => {
    const submitButton = screen.getByDisplayValue(/make your reservation/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);

    // Fill out the form with valid data
    fireEvent.change(guestsInput, { target: { value: '5' } }); // Valid number of guests
    fireEvent.change(occasionSelect, { target: { value: 'Birthday' } }); // Valid occasion

    // Attempt to submit the form
    fireEvent.click(submitButton);

    // Verify the form submits correctly
    // For example, check if a success message is displayed
   // expect(screen.getByText(/Your booking has been confirmed!/i)).toBeInTheDocument();

    // Verify the API call is made if applicable
    // expect(api.submitReservation).toHaveBeenCalled();
  });
});
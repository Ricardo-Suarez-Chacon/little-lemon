import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import BookingForm from '../Components/BookingForm';
import BookingPage from '../Pages/BookingPage';
import { fetchAPI, submitAPI  } from '../API/BookingApi';


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
    
    expect(times).toEqual(expectedTimes);

  });
});

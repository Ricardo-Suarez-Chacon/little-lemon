// BookingForm.stories.js

import React from 'react';
import { action } from '@storybook/addon-actions';
import BookingForm from '../Components/BookingForm';

export default {
  title: 'BookingForm',
  component: BookingForm,
};

const Template = (args) => <BookingForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  dispatch: action('dispatched'), // Mock function to log the action
  availableTimes: ['12:00', '13:00', '14:00', '15:00'], // Example times
};
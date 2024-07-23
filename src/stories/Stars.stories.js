import React from 'react';
import Stars from '../Components/Stars';

export default {
  title: 'Stars',
  component: Stars,
};

const Template = (args) => <Stars {...args} />;

export const ThreePointFiveStars = Template.bind({});
ThreePointFiveStars.args = {
  rating: 3.5,
};

export const FourStars = Template.bind({});
FourStars.args = {
  rating: 4,
};

export const FiveStars = Template.bind({});
FiveStars.args = {
  rating: 5,
};
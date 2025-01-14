import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { MusicControlButton } from './MusicControlButton';

export default {
  title: 'Molecules/MusicControlButton',
  component: MusicControlButton,
  argTypes: {
    duration: { control: 'number', defaultValue: 120 }, // Duration in seconds
  },
} as Meta;

const Template: StoryFn<{ duration: number }> = (args) => (
  <MusicControlButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  duration: 120,
};

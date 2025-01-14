// src/components/MusicProgressbar.stories.tsx

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import MusicProgressbar, { MusicProgressbarProp } from './MusicProgressbar';

export default {
  title: 'Molecules/MusicProgressbar',
  component: MusicProgressbar,
  argTypes: {
    musicDuration: { control: 'number', defaultValue: 120 },
    initialValue: { control: 'number', defaultValue: 0.5 },
    initialHeight: { control: 'number', defaultValue: 2 },
    expandedHeight: { control: 'number', defaultValue: 4 },
    heightBuffer: { control: 'number', defaultValue: 12 },
    onChange: { action: 'changed' },
  },
} as Meta<MusicProgressbarProp>;

const Template: StoryFn<MusicProgressbarProp> = (args) => (
  <MusicProgressbar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  musicDuration: 120,
  initialValue: 0.5,
  initialHeight: 2,
  expandedHeight: 4,
  heightBuffer: 12,
};

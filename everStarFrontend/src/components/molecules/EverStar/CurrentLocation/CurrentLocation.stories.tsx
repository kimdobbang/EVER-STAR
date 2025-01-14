import type { Meta, StoryObj } from '@storybook/react';
import { CurrentLocation } from './CurrentLocation';

const meta: Meta<typeof CurrentLocation> = {
  title: 'Molecules/EverStar/CurrentLocation',
  component: CurrentLocation,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CurrentLocation>;

export const Default: Story = {
  args: {
    title: '뚜뚜',
    type: 'everstar',
  },
};

export const Earth: Story = {
  args: {
    title: '현재위치',
    type: 'earth',
  },
};

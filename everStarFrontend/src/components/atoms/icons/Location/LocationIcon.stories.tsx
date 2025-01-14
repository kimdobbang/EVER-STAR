import type { Meta, StoryObj } from '@storybook/react';
import { LocationIcon } from './LocationIcon';

const meta: Meta<typeof LocationIcon> = {
  title: 'Atoms/Icons/LocationIcon',
  component: LocationIcon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio', options: [16, 24] },
    },
    color: {
      control: { type: 'radio', options: ['black', 'gray', 'white', 'orange'] },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LocationIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

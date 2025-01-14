import type { Meta, StoryObj } from '@storybook/react';
import { PhoneStopIcon } from './PhoneStopIcon';

const meta: Meta<typeof PhoneStopIcon> = {
  title: 'Atoms/Icons/PhoneStopIcon',
  component: PhoneStopIcon,
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
type Story = StoryObj<typeof PhoneStopIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

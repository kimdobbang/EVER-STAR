import type { Meta, StoryObj } from '@storybook/react';
import { PhoneIcon } from './PhoneIcon';

const meta: Meta<typeof PhoneIcon> = {
  title: 'Atoms/Icons/PhoneIcon',
  component: PhoneIcon,
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
type Story = StoryObj<typeof PhoneIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

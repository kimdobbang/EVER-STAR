import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircleIcon } from './CheckCircleIcon';

const meta: Meta<typeof CheckCircleIcon> = {
  title: 'Atoms/Icons/CheckCircleIcon',
  component: CheckCircleIcon,
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
type Story = StoryObj<typeof CheckCircleIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

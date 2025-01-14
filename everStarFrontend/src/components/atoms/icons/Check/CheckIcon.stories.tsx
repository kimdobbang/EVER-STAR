import type { Meta, StoryObj } from '@storybook/react';
import { CheckIcon } from './CheckIcon';

const meta: Meta<typeof CheckIcon> = {
  title: 'Atoms/Icons/CheckIcon',
  component: CheckIcon,
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
type Story = StoryObj<typeof CheckIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { ArrowIcon } from './ArrowIcon';

const meta: Meta<typeof ArrowIcon> = {
  title: 'Atoms/Icons/ArrowIcon',
  component: ArrowIcon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio', options: [16, 24] },
    },
    direction: {
      control: { type: 'radio', options: ['left', 'right', 'up', 'down'] },
    },
    color: {
      control: { type: 'radio', options: ['black', 'gray', 'white', 'orange'] },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArrowIcon>;

export const Default: Story = {
  args: {
    size: 24,
    direction: 'right',
    color: 'black',
  },
};

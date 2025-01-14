import type { Meta, StoryObj } from '@storybook/react';
import { SearchIcon } from './SearchIcon';

const meta: Meta<typeof SearchIcon> = {
  title: 'Atoms/Icons/SearchIcon',
  component: SearchIcon,
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
type Story = StoryObj<typeof SearchIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

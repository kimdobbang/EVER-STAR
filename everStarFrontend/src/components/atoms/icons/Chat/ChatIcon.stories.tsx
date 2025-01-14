import type { Meta, StoryObj } from '@storybook/react';
import { ChatIcon } from './ChatIcon';

const meta: Meta<typeof ChatIcon> = {
  title: 'Atoms/Icons/ChatIcon',
  component: ChatIcon,
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
type Story = StoryObj<typeof ChatIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

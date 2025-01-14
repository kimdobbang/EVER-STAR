import type { Meta, StoryObj } from '@storybook/react';
import { CloseIcon } from './CloseIcon';

const meta: Meta<typeof CloseIcon> = {
  title: 'Atoms/Icons/CloseIcon',
  component: CloseIcon,
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
type Story = StoryObj<typeof CloseIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

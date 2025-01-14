import type { Meta, StoryObj } from '@storybook/react';
import { ExitIcon } from './ExitIcon';

const meta: Meta<typeof ExitIcon> = {
  title: 'Atoms/Icons/ExitIcon',
  component: ExitIcon,
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
type Story = StoryObj<typeof ExitIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

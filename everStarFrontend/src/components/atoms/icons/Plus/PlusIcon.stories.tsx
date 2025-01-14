import type { Meta, StoryObj } from '@storybook/react';
import { PlusIcon } from './PlusIcon';

const meta: Meta<typeof PlusIcon> = {
  title: 'Atoms/Icons/PlusIcon',
  component: PlusIcon,
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
type Story = StoryObj<typeof PlusIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { PencilIcon } from './PencilIcon';

const meta: Meta<typeof PencilIcon> = {
  title: 'Atoms/Icons/PencilIcon',
  component: PencilIcon,
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
type Story = StoryObj<typeof PencilIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

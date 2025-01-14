import type { Meta, StoryObj } from '@storybook/react';
import { CloseCircleIcon } from './CloseCircleIcon';

const meta: Meta<typeof CloseCircleIcon> = {
  title: 'Atoms/Icons/CloseCircleIcon',
  component: CloseCircleIcon,
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
type Story = StoryObj<typeof CloseCircleIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

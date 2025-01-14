import type { Meta, StoryObj } from '@storybook/react';
import { ShareIcon } from './ShareIcon';

const meta: Meta<typeof ShareIcon> = {
  title: 'Atoms/Icons/ShareIcon',
  component: ShareIcon,
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
type Story = StoryObj<typeof ShareIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

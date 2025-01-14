import type { Meta, StoryObj } from '@storybook/react';
import { VideoOffIcon } from './VideoOffIcon';

const meta: Meta<typeof VideoOffIcon> = {
  title: 'Atoms/Icons/VideoOffIcon',
  component: VideoOffIcon,
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
type Story = StoryObj<typeof VideoOffIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

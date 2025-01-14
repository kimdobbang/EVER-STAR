import type { Meta, StoryObj } from '@storybook/react';
import { VideoIcon } from './VideoIcon';

const meta: Meta<typeof VideoIcon> = {
  title: 'Atoms/Icons/VideoIcon',
  component: VideoIcon,
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
type Story = StoryObj<typeof VideoIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

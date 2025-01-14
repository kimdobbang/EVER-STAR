import type { Meta, StoryObj } from '@storybook/react';
import { MicrophoneIcon } from './MicrophoneIcon';

const meta: Meta<typeof MicrophoneIcon> = {
  title: 'Atoms/Icons/MicrophoneIcon',
  component: MicrophoneIcon,
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
type Story = StoryObj<typeof MicrophoneIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

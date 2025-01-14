import type { Meta, StoryObj } from '@storybook/react';
import { MicrophoneOffIcon } from './MicrophoneOffIcon';

const meta: Meta<typeof MicrophoneOffIcon> = {
  title: 'Atoms/Icons/MicrophoneOffIcon',
  component: MicrophoneOffIcon,
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
type Story = StoryObj<typeof MicrophoneOffIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

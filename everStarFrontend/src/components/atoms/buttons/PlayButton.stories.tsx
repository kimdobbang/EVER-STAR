import type { Meta, StoryObj } from '@storybook/react';
import { PlayButton } from './PlayButton';

const meta: Meta<typeof PlayButton> = {
  title: 'Atoms/Buttons/PlayButton',
  component: PlayButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio', options: [16, 24] },
    },
    direction: {
      control: { type: 'radio', options: ['play', 'stop'] },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PlayButton>;

export const Default: Story = {
  args: {
    size: 16,
    direction: 'play',
  },
};

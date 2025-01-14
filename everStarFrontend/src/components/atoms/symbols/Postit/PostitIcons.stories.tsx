import type { Meta, StoryObj } from '@storybook/react';
import { PostitIcons } from './PostitIcons';

const meta: Meta<typeof PostitIcons> = {
  title: 'Atoms/Symbols/PostitIcons',
  component: PostitIcons,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio', options: ['postit', 'postit-text'] },
    },
    text: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PostitIcons>;

export const Default: Story = {
  args: {
    variant: 'postit',
    text: '응원메시지',
  },
};

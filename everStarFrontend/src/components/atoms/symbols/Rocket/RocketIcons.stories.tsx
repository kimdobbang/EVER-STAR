import type { Meta, StoryObj } from '@storybook/react';
import { RocketIcons } from './RocketIcons';

const meta: Meta<typeof RocketIcons> = {
  title: 'Atoms/Symbols/RocketIcons',
  component: RocketIcons,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio', options: ['rocket', 'rocket-text'] },
    },
    text: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RocketIcons>;

export const Default: Story = {
  args: {
    variant: 'rocket',
    text: '영원별탐사',
  },
};

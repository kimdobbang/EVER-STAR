import type { Meta, StoryObj } from '@storybook/react';
import { LetterboxIcons } from './LetterboxIcons';

const meta: Meta<typeof LetterboxIcons> = {
  title: 'Atoms/Symbols/LetterboxIcons',
  component: LetterboxIcons,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'radio',
        options: ['letterbox', 'letterbox-alert', 'letterbox-text'],
      },
    },
    number: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LetterboxIcons>;

export const Default: Story = {
  args: {
    variant: 'letterbox',
    number: 1,
  },
};

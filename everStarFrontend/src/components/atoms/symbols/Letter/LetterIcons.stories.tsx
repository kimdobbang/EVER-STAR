import type { Meta, StoryObj } from '@storybook/react';
import { LetterIcons } from './LetterIcons';

const meta: Meta<typeof LetterIcons> = {
  title: 'Atoms/Symbols/LetterIcons',
  component: LetterIcons,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio', options: ['letter', 'letter-text'] },
    },
    text: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LetterIcons>;

export const Default: Story = {
  args: {
    variant: 'letter',
    text: '편지쓰기',
  },
};

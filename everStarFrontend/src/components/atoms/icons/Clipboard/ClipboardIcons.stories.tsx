import type { Meta, StoryObj } from '@storybook/react';
import { ClipboardIcons } from './ClipboardIcons';

const meta: Meta<typeof ClipboardIcons> = {
  title: 'Atoms/Icons/ClipboardIcons',
  component: ClipboardIcons,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio', options: [16, 24] },
    },
    variant: {
      control: { type: 'radio', options: ['lock', 'lock-check'] },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClipboardIcons>;

export const Default: Story = {
  args: {
    size: 24,
    variant: 'lock',
  },
};

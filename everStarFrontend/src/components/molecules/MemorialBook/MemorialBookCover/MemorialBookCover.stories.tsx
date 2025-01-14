import type { Meta, StoryObj } from '@storybook/react';
import { MemorialBookCover } from './MemorialBookCover';

const meta: Meta<typeof MemorialBookCover> = {
  title: 'Molecules/MemorialBook/MemorialBookCover',
  component: MemorialBookCover,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MemorialBookCover>;

export const Default: Story = {};

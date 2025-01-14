import type { Meta, StoryObj } from '@storybook/react';
import { AtomBookcover } from './Bookcover';

const meta: Meta<typeof AtomBookcover> = {
  title: 'Atoms/Images/Bookcover',
  component: AtomBookcover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Bookcover component displays a book cover image.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AtomBookcover>;

export const Default: Story = {};

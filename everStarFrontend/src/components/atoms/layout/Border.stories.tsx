import type { Meta, StoryObj } from '@storybook/react';
import { Border } from './Border';

const meta: Meta<typeof Border> = {
  title: 'Atoms/Layout/Border',
  component: Border,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Border>;

export const Default: Story = {};

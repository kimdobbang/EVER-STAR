import { Meta, StoryObj } from '@storybook/react';
import { PageIndicator } from './PageIndicator';

const meta: Meta<typeof PageIndicator> = {
  title: 'Molecules/PageIndicator',
  component: PageIndicator,
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Current page number',
    },
    totalPages: {
      control: 'number',
      description: 'Total number of pages',
    },
    onPageChange: { action: 'page changed' },
  },
};

export default meta;

type Story = StoryObj<typeof PageIndicator>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 3,
  },
};

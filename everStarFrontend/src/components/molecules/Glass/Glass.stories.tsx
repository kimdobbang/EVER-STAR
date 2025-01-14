import { Meta, StoryObj } from '@storybook/react';
import { Glass } from './Glass';

const meta: Meta<typeof Glass> = {
  title: 'Molecules/Glass',
  tags: ['autodocs'],
  component: Glass,
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
    showPageIndicator: {
      control: 'boolean',
      description: 'Show or hide the PageIndicator',
    },
    className: {
      control: 'text',
      description: 'Additional classes for styling',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Glass>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 3,
    showPageIndicator: true,
    className: '',
  },
};

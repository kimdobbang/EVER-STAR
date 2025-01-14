import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    totalPages: {
      control: { type: 'number' },
      description: 'Total number of pages',
    },
    activePage: {
      control: { type: 'number' },
      description: 'The currently active page',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalPages: 4, // 기본 페이지 수를 4로 설정
    activePage: 1, // 기본 활성화 페이지를 1로 설정
  },
};

export const FivePages: Story = {
  args: {
    totalPages: 5, // 총 페이지 수를 5로 설정
    activePage: 2, // 활성화된 페이지를 2로 설정
  },
};

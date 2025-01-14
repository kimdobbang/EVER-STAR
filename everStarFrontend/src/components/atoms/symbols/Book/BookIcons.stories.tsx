import type { Meta, StoryObj } from '@storybook/react';
import { BookIcons } from './BookIcons';

const meta: Meta<typeof BookIcons> = {
  title: 'Atoms/Symbols/BookIcons',
  component: BookIcons,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio', options: ['book-close', 'book-open'] },
    },
    altText: {
      control: 'text',
      description: 'Alternative text for the book icon image',
      defaultValue: 'Book Icon', // 기본값을 지정합니다.
    },
    className: {
      control: 'text',
      description: 'CSS class name for custom styling',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BookIcons>;

export const Default: Story = {
  args: {
    variant: 'book-close',
    altText: 'Closed book icon',
    className: '', // 기본적으로 클래스 이름은 비워둡니다.
  },
};

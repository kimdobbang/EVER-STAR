import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Symbols/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'radio',
        options: ['small', 'medium', 'large', 'text', 'square'],
      },
    },
    name: {
      control: { type: 'text' },
    },
    src: {
      control: { type: 'text' },
    },
    onClick: {
      action: 'onClick', // 클릭 액션 추가
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    size: 'medium',
    name: '홍길동',
  },
};

export const Square: Story = {
  args: {
    size: 'square',
    src: 'https://via.placeholder.com/340x250', // 예시 이미지 URL
  },
};

export const SquareWithDefaultSrc: Story = {
  args: {
    size: 'square',
    // src를 제공하지 않으면 기본 이미지 사용
  },
};

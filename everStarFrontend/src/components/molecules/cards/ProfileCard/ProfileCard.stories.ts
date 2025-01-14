import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';

const meta: Meta<typeof ProfileCard> = {
  title: 'Molecules/Card/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'text' },
    },
    age: {
      control: { type: 'number' },
    },
    date: {
      control: { type: 'text' },
    },
    description: {
      control: { type: 'text' },
    },
    tagList: {
      control: { type: 'object' },
    },
    avatarSrc: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Default: Story = {
  args: {
    name: '홍길동',
    age: 25,
    date: '2024-08-01',
    description: '여기에 설명을 입력하세요.',
    tagList: ['친절한', '성실한', '열정적인'],
  },
};

export const AvatarSrc: Story = {
  args: {
    name: '이순신',
    age: 45,
    date: '2024-07-01',
    description: '여기는 사용자 설명이 들어갑니다.',
    tagList: ['용감한', '지혜로운', '강인한', '친절한'],
    avatarSrc: 'https://via.placeholder.com/340x250', // 예시 이미지 URL
  },
};

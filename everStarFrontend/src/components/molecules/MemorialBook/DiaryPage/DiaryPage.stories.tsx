import type { Meta, StoryObj } from '@storybook/react';
import { DiaryPage } from './DiaryPage';

const meta: Meta<typeof DiaryPage> = {
  title: 'Molecules/MemorialBook/DiaryPage',
  component: DiaryPage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DiaryPage>;

export const Default: Story = {
  args: {
    title: '오늘의 일기',
    content:
      '오늘은 강아지와 함께 공원에서 산책을 했어요. 날씨가 좋아서 기분도 좋았어요.',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { QuestionPage } from './QuestionPage';

const meta: Meta<typeof QuestionPage> = {
  title: 'Molecules/MemorialBook/QuestionPage',
  component: QuestionPage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof QuestionPage>;

export const Default: Story = {
  args: {
    title: '강아지와 행복했던 순간을 말해주세요.',
    myAnswer: '나는 강아지와 공원에서 산책하는 것을 좋아합니다.',
    petName: '바둑이',
    petAnswer: '바둑이는 나와 함께 놀 때 가장 행복해 보입니다.',
  },
};

export const WithoutPetAnswer: Story = {
  args: {
    title: '강아지와 행복했던 순간을 말해주세요.',
    myAnswer: '나는 강아지와 공원에서 산책하는 것을 좋아합니다.',
    petName: '바둑이',
  },
};

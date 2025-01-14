import type { Meta, StoryObj } from '@storybook/react';
import { ImagePage } from './ImagePage';

const meta: Meta<typeof ImagePage> = {
  title: 'Molecules/MemorialBook/ImagePage',
  component: ImagePage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ImagePage>;

export const Default: Story = {
  args: {
    question: '그린 그림을 공유해주세요',
    myImage: 'https://via.placeholder.com/180x135',
    myAnswer: '이것은 나의 그림입니다.',
    petImage: 'https://via.placeholder.com/180x135',
    petAnswer: '이것은 반려동물의 그림입니다.',
    petName: '뚜뚜',
  },
};

export const WithoutPetAnswer: Story = {
  args: {
    question: '그린 그림을 공유해주세요',
    myImage: 'https://via.placeholder.com/180x135',
    myAnswer: '이것은 나의 그림입니다.',
    petName: '뚜뚜',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { EverStarMain } from './EverStarMain';

const meta: Meta<typeof EverStarMain> = {
  title: 'Templates/EverStarMain',
  component: EverStarMain,
  parameters: {
    viewport: {
      viewports: {
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
      },
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EverStarMain>;

export const Default: Story = {
  args: {
    petProfile: {
      name: '뚜뚜',
      age: 5,
      date: '2024-08-15',
      description: '뚜뚜는 매우 활발한 강아지입니다.',
      tagList: ['활발한', '친근한'],
      avatarUrl: 'https://example.com/avatar.jpg',
      questIndex: 0,
    },
    buttonDisabled: false,
    memorialBookProfile: {
      id: 1,
      psychologicalTestResult: '정상',
      isOpen: true,
      isActive: true,
    },
    petId: 1,
  },
};

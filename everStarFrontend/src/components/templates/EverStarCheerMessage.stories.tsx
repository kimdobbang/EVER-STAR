import type { Meta, StoryObj } from '@storybook/react';
import { EverStarCheerMessage } from './EverStarCheerMessage';

const meta: Meta<typeof EverStarCheerMessage> = {
  title: 'Templates/EverStarCheerMessage',
  component: EverStarCheerMessage,
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

type Story = StoryObj<typeof EverStarCheerMessage>;

export const Default: Story = {
  args: {
    profile: {
      name: '홍길동',
      age: 5,
      date: '2023-07-25',
      description: '사랑스러운 반려동물입니다.',
      tagList: ['쾌활한', '귀여운', '애교많은'],
      avatarUrl: 'https://example.com/avatar.jpg',
    },
    totalPages: 1,
  },
};

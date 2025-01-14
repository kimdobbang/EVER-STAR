import type { Meta, StoryObj } from '@storybook/react';
import { MemorialBookDiaryModal } from './MemorialBookDiaryModal';

const meta: Meta<typeof MemorialBookDiaryModal> = {
  title: 'organics/MemorialBookDiaryModal',
  component: MemorialBookDiaryModal,
  tags: ['autodocs'],
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
};

export default meta;

type Story = StoryObj<typeof MemorialBookDiaryModal>;

export const Default: Story = {
  args: {
    isOpen: true, // 모달이 기본으로 열려있도록 설정
    onClose: () => console.log('Modal closed'), // 모달 닫기 시 콘솔에 로그 출력
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const Tablet: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

export const Mobile: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};

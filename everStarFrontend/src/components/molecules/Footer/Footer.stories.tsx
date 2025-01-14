import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Molecules/Footer',
  component: Footer,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Footer>;

// 기본 스토리: Default Footer
export const Default: Story = {
  args: {},
};

// 모바일 환경에서의 Footer 스토리
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  },
  args: {
    className: 'bg-white',
  },
};

// 데스크탑 환경에서의 Footer 스토리
export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  args: {
    className: 'bg-gray-100',
  },
};

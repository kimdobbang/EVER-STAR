import type { Meta, StoryObj } from '@storybook/react';
import { KakaoLoginButton } from 'components/atoms/buttons/KakaoLoginButton';

const meta: Meta<typeof KakaoLoginButton> = {
  title: 'Atoms/Buttons/KakaoLoginButton',
  component: KakaoLoginButton,
  argTypes: {
    size: {
      control: { type: 'radio', options: ['large', 'medium'] },
      description: '버튼의 크기',
    },
    variant: {
      control: { type: 'radio', options: ['narrow', 'wide'] },
      description: '버튼의 변형',
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof KakaoLoginButton>;

export const LargeNarrow: Story = {
  args: {
    size: 'large',
    variant: 'narrow',
  },
};

export const LargeWide: Story = {
  args: {
    size: 'large',
    variant: 'wide',
  },
};

export const MediumNarrow: Story = {
  args: {
    size: 'medium',
    variant: 'narrow',
  },
};

export const MediumWide: Story = {
  args: {
    size: 'medium',
    variant: 'wide',
  },
};

export const Default: Story = {
  args: {
    // 기본값 사용, size와 variant를 설정하지 않음
  },
};

Default.storyName = 'Default';

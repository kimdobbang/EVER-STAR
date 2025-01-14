import type { Meta, StoryObj } from '@storybook/react';
import { GoogleLoginButton } from 'components/atoms/buttons/GoogleLoginButton';

const meta: Meta<typeof GoogleLoginButton> = {
  title: 'Atoms/Buttons/GoogleLoginButton',
  component: GoogleLoginButton,
  argTypes: {
    shape: {
      control: { type: 'radio', options: ['round', 'square'] },
      description: '버튼의 모양',
    },
    variant: {
      control: { type: 'radio', options: ['ctn', 'na', 'SI', 'SU'] },
      description: '버튼의 종류',
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GoogleLoginButton>;

export const RoundCtn: Story = {
  args: {
    shape: 'round',
    variant: 'ctn',
  },
};

export const RoundNa: Story = {
  args: {
    shape: 'round',
    variant: 'na',
  },
};

export const RoundSI: Story = {
  args: {
    shape: 'round',
    variant: 'SI',
  },
};

export const RoundSU: Story = {
  args: {
    shape: 'round',
    variant: 'SU',
  },
};

export const SquareCtn: Story = {
  args: {
    shape: 'square',
    variant: 'ctn',
  },
};

export const SquareNa: Story = {
  args: {
    shape: 'square',
    variant: 'na',
  },
};

export const SquareSI: Story = {
  args: {
    shape: 'square',
    variant: 'SI',
  },
};

export const SquareSU: Story = {
  args: {
    shape: 'square',
    variant: 'SU',
  },
};

export const Default: Story = {
  args: {
    // 기본값 사용, shape와 variant를 설정하지 않음
  },
};

Default.storyName = 'Default';

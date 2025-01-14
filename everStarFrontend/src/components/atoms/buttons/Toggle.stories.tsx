import { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';

// 메타데이터 설정
const meta: Meta<typeof Toggle> = {
  title: 'Atoms/Buttons/Toggle',
  component: Toggle,
  argTypes: {
    status: {
      control: { type: 'radio' },
      options: ['off', 'on'],
      defaultValue: 'on',
    },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

// 기본 스토리
export const Default: Story = {
  args: {
    status: 'off',
    className: '',
  },
};

// 'On' 상태 스토리
export const OnState: Story = {
  args: {
    status: 'on',
    className: '',
  },
};

// 'Off' 상태 스토리
export const OffState: Story = {
  args: {
    status: 'off',
    className: '',
  },
};

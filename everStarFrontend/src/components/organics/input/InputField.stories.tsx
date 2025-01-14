import { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputFields';

const meta: Meta<typeof InputField> = {
  title: 'Organics/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '레이블 텍스트',
      defaultValue: '레이블',
    },
    showLabel: {
      control: 'boolean',
      description: '레이블 표시 여부',
      defaultValue: true,
    },
    showValidationText: {
      control: 'boolean',
      description: '유효성 검사 텍스트 표시 여부',
      defaultValue: true,
    },
    state: {
      control: {
        type: 'select',
        options: ['default', 'focus', 'disable', 'done', 'error'],
      },
      description: 'InputField 상태',
      defaultValue: 'default',
    },
    className: {
      control: 'text',
      description: '추가 클래스 이름',
      defaultValue: '',
    },
    text: {
      control: 'text',
      description: 'InputField의 텍스트',
      defaultValue: '',
    },
    showCheckIcon: {
      control: 'boolean',
      description: '체크 아이콘 표시 여부',
      defaultValue: false,
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
      defaultValue: '비밀번호를 입력해 주세요',
    },
    readOnlyState: {
      control: 'boolean',
      description: '편집 불가 여부',
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: '레이블',
    showLabel: true,
    showValidationText: true,
    state: 'default',
    className: '',
    text: '',
    showCheckIcon: false,
    placeholder: '비밀번호를 입력해 주세요',
    readOnlyState: false,
  },
};

export const Focus: Story = {
  args: {
    label: '레이블',
    showLabel: true,
    showValidationText: true,
    state: 'focus',
    className: '',
    text: '',
    showCheckIcon: false,
    placeholder: '비밀번호를 입력해 주세요',
  },
};

export const Disabled: Story = {
  args: {
    label: '레이블',
    showLabel: true,
    showValidationText: true,
    state: 'disable',
    className: '',
    text: '',
    showCheckIcon: false,
    placeholder: '비밀번호를 입력해 주세요',
  },
};

export const Done: Story = {
  args: {
    label: '레이블',
    showLabel: true,
    showValidationText: true,
    state: 'done',
    className: '',
    text: '',
    showCheckIcon: true,
    placeholder: '비밀번호를 입력해 주세요',
  },
};

export const Error: Story = {
  args: {
    label: '레이블',
    showLabel: true,
    showValidationText: true,
    state: 'error',
    className: '',
    text: '',
    showCheckIcon: false,
    placeholder: '비밀번호를 입력해 주세요',
  },
};

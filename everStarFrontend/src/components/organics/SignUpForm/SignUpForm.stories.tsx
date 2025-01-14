import type { Meta, StoryObj } from '@storybook/react';
import { SignUpForm, SignUpFormProps } from './SignUpForm';

const meta: Meta<SignUpFormProps> = {
  title: 'Organics/SignUpForm',
  component: SignUpForm,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<SignUpFormProps>;

export const Default: Story = {
  args: {
    headerText: '개인정보 입력하기',
    smallButtonText: '',
    showPrimaryButton: true,
    text: '당신의 정보를<br/>입력해주세요.',
  },
};

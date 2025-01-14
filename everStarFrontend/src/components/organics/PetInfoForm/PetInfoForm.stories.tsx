import { Meta, StoryObj } from '@storybook/react';
import { PetInfoForm, PetInfoFormProps } from './PetInfoForm';

const meta: Meta<PetInfoFormProps> = {
  title: 'Organics/PetInfoForm',
  component: PetInfoForm,
  tags: ['autodocs'],
  argTypes: {
    headerText: {
      control: 'text',
      description: '폼 헤더 텍스트',
      defaultValue: '반려동물 정보 입력',
    },
    smallButtonText: {
      control: 'text',
      description: '작은 버튼 텍스트',
      defaultValue: '제출',
    },
    showPrimaryButton: {
      control: 'boolean',
      description: '주 버튼 표시 여부',
      defaultValue: true,
    },
    text: {
      control: 'text',
      description: '폼 설명 텍스트',
      defaultValue: '반려동물의 정보를<br/>입력해주세요.',
    },
    onClose: {
      action: 'closed',
    },
    onSubmit: {
      action: 'submitted',
    },
  },
};

export default meta;

type Story = StoryObj<PetInfoFormProps>;

export const Default: Story = {
  args: {
    headerText: '반려동물 정보 입력',
    smallButtonText: '', // 아이콘버튼이기 때문에 비워둠
    showPrimaryButton: true,
    text: '반려동물의 정보를<br/>입력해주세요.', // 텍스트 추가
    onClose: () => {},
    onSubmit: () => {},
  },
};

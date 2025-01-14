import { Meta, StoryObj } from '@storybook/react';
import { PhoneNumberModal, PhoneNumberModalProps } from './PhoneNumberModal';

const meta: Meta<PhoneNumberModalProps> = {
  title: 'Organics/PhoneNumberModal',
  tags: ['autodocs'],
  component: PhoneNumberModal,
  argTypes: {
    isOpen: { control: 'boolean', defaultValue: true },
    onClose: { action: 'closed' },
    onResend: { action: 'resend code' },
    onVerify: { action: 'verify code' },
    text: { control: 'text', defaultValue: '인증번호를 <br /> 입력해 주세요' },
    height: { control: 'text', defaultValue: '800px' },
  },
};

export default meta;

type Story = StoryObj<PhoneNumberModalProps>;

export const Default: Story = {
  args: {
    isOpen: true,
    text: '인증번호를 <br /> 입력해 주세요',
    height: '800px',
  },
};

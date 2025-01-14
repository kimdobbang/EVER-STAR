import { Meta, StoryObj } from '@storybook/react';
import { IntroduceWrite, IntroduceWriteProps } from './IntroduceWrite';

const meta: Meta<IntroduceWriteProps> = {
  title: 'Organics/CheerMessage/IntroduceWrite',
  tags: ['autodocs'],
  component: IntroduceWrite,
  argTypes: {
    isOpen: { control: 'boolean', defaultValue: true },
    onClose: { action: 'closed' },
    onResend: { action: 'resend code' },
    onVerify: { action: 'verify code' },
    text: { control: 'text', defaultValue: '소개글을 <br /> 작성해주세요' },
    height: { control: 'text', defaultValue: '800px' },
  },
};

export default meta;

type Story = StoryObj<IntroduceWriteProps>;

export const Default: Story = {
  args: {
    isOpen: true,
    text: '소개글을 <br /> 작성해주세요',
    height: '800px',
  },
};

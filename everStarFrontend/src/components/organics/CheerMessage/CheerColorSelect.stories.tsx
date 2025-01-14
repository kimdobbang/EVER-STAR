import { Meta, StoryObj } from '@storybook/react';
import { CheerColorSelect, CheerColorSelectProps } from './CheerColorSelect';

const meta: Meta<CheerColorSelectProps> = {
  title: 'Organics/CheerMessage/CheerColorSelect',
  tags: ['autodocs'],
  component: CheerColorSelect,
  argTypes: {
    isOpen: { control: 'boolean', defaultValue: true },
    onClose: { action: 'closed' },
    onResend: { action: 'resend code' },
    onVerify: { action: 'verify code' },
    text: { control: 'text', defaultValue: '' },
    height: { control: 'text', defaultValue: '800px' },
  },
};

export default meta;

type Story = StoryObj<CheerColorSelectProps>;

export const Default: Story = {
  args: {
    isOpen: true,
    text: '색상을 선택하세요.',
    height: '800px',
  },
};

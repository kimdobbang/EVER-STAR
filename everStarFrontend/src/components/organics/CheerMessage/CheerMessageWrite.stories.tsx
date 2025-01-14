import { Meta, StoryObj } from '@storybook/react';
import { CheerMessageWrite, CheerMessageWriteProps } from './CheerMessageWrite';

const meta: Meta<CheerMessageWriteProps> = {
  title: 'Organics/CheerMessage/CheerMessageWrite',
  tags: ['autodocs'],
  component: CheerMessageWrite,
  argTypes: {
    isOpen: { control: 'boolean', defyaultValue: true },
    onClose: { action: 'closed' },
    onVerify: { action: 'verify code' },
    text: {
      control: 'text',
      defaultValue: '힘이되는 <br /> 응원메시지를 작성해주세요',
    },
    height: { control: 'text', defaultValue: '800px' },
  },
};

export default meta;

type Story = StoryObj<CheerMessageWriteProps>;

export const Default: Story = {
  args: {
    isOpen: true,
    text: '힘이되는 <br /> 응원메시지를 작성해주세요',
    height: '800px',
  },
};

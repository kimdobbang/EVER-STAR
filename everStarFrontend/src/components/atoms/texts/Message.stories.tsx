import type { Meta, StoryObj } from '@storybook/react';
import { Message } from './Message';

const meta: Meta<typeof Message> = {
  title: 'Atoms/Texts/Message',
  component: Message,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '3rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '메시지 텍스트',
      defaultValue: '기본 메시지',
    },
    color: {
      control: {
        type: 'select',
        options: ['orange', 'gray'],
      },
      description: '메시지 배경 색상',
      defaultValue: 'gray',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '기본 메시지',
    color: 'gray',
  },
};

export const OrangeMessage: Story = {
  args: {
    children: '오렌지 메시지',
    color: 'orange',
  },
};

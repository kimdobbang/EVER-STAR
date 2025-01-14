import { Meta, StoryObj } from '@storybook/react';
import { MessageWithTime } from './MessageWithTime';

const meta: Meta<typeof MessageWithTime> = {
  title: 'Molecules/Card/MessageWithTime',
  component: MessageWithTime,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    flag: {
      control: 'boolean',
      description: '메시지 배치 플래그',
      defaultValue: true,
    },
    contents: {
      control: 'text',
      description: '메시지 내용',
      defaultValue: '이것은 메시지 내용입니다.',
    },
    time: {
      control: 'text',
      description: '메시지 시간',
      defaultValue: '23:00',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    flag: true,
    contents: '이것은 메시지 내용입니다.',
    time: '23:00',
  },
};

export const Alternate: Story = {
  args: {
    flag: false,
    contents: '이 메시지는 플래그가 false인 상태에서 보여집니다.',
    time: '23:00',
  },
};

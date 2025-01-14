import type { Meta, StoryObj } from '@storybook/react';
import { RtcCard } from './RtcCard';

const meta: Meta<typeof RtcCard> = {
  title: 'Molecules/Card/RtcCard',
  component: RtcCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: '사용자 이름',
      defaultValue: '홍길동',
    },
    videoState: {
      control: 'boolean',
      description: '비디오 상태',
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof RtcCard>;

export const VideoOn: Story = {
  args: {
    name: '홍길동',
    videoState: true,
  },
};

export const VideoOff: Story = {
  args: {
    name: '홍길동',
    videoState: false,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { LetterCard } from './LetterCard';

const meta: Meta<typeof LetterCard> = {
  title: 'Molecules/Card/LetterCard',
  component: LetterCard,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['default', 'send', 'receive'],
      },
      description: '편지 유형',
      defaultValue: 'default',
    },
    color: {
      control: {
        type: 'select',
        options: ['white', 'bgorange', 'orange', 'gray'],
      },
      description: '편지 배경 색상',
      defaultValue: 'white',
    },
    state: {
      control: {
        type: 'select',
        options: ['received', 'notReceived'],
      },
      description: '편지 상태',
      defaultValue: 'notReceived',
    },
    name: {
      control: 'text',
      description: '발신자 이름',
      defaultValue: '홍길동',
    },
    sendMessage: {
      control: 'text',
      description: '보낸 메시지',
      defaultValue: '안녕하세요',
    },
    message: {
      control: 'text',
      description: '받은 메시지 또는 보낼 메시지',
      defaultValue: '안녕하세요',
    },
    dateTime: {
      control: 'text',
      description: '날짜 및 시간',
      defaultValue: '2024-07-24 10:00:00',
    },
    className: {
      control: {
        type: 'text',
      },
      description: '클래스 네임 (폰트 패밀리)',
      defaultValue: '',
    },
    centered: {
      control: 'boolean',
      description: '중앙 정렬 여부',
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof LetterCard>;

export const Default: Story = {
  args: {
    type: 'default',
    color: 'white',
    state: 'notReceived',
    name: '홍길동',
    sendMessage: '안녕하세요',
    message: '안녕하세요',
    dateTime: '2024-07-24 10:00:00',
    className: '', // 기본 폰트 설정
    centered: false,
  },
};

export const SentLetter: Story = {
  args: {
    type: 'send',
    color: 'bgorange',
    state: 'notReceived',
    name: '이순신',
    message: '안녕하세요, 이순신입니다.',
    dateTime: '2024-07-24 10:00:00',
    className: '', // 기본 폰트 설정
    centered: false,
  },
};

export const ReceivedLetter: Story = {
  args: {
    type: 'receive',
    color: 'gray',
    state: 'received',
    name: '이순신',
    message: '안녕하세요, 답장 보냅니다.',
    dateTime: '2024-07-24 10:00:00',
    className: '', // 기본 폰트 설정
    centered: false,
    visible: true,
  },
};

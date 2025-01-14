import type { Meta, StoryObj } from '@storybook/react';
import { MoveContainer } from './MoveContainer';

const meta: Meta<typeof MoveContainer> = {
  title: 'Organics/MoveContainer',
  component: MoveContainer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'MoveContainer 컴포넌트는 사용자가 마이페이지로 이동하거나 반려동물을 변경할 수 있는 버튼을 포함한 컨테이너입니다.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: '헤더에 표시될 제목',
      defaultValue: '정보 보기',
    },
    nextPage1: {
      control: {
        type: 'select',
        options: ['mypage', 'profile', 'random', 'search'],
      },
      description: '첫 번째 버튼의 이동 위치',
      defaultValue: 'mypage',
    },
    nextPage2: {
      control: {
        type: 'select',
        options: ['mypage', 'profile', 'random', 'search'],
      },
      description: '두 번째 버튼의 이동 위치',
      defaultValue: 'profile',
    },
  },
};

export default meta;

type Story = StoryObj<typeof MoveContainer>;

export const Default: Story = {
  args: {
    title: '정보 보기',
    nextPage1: 'mypage',
    nextPage2: 'profile',
  },
};

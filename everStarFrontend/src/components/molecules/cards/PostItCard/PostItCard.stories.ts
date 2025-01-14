import { Meta, StoryObj } from '@storybook/react';
import { PostItCard } from './PostItCard';

const meta: Meta<typeof PostItCard> = {
  title: 'Molecules/Card/PostItCard',
  component: PostItCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    contents: {
      control: 'text',
      description: '내용',
      defaultValue: '이것은 메모입니다. 내용을 여기에 입력하십시오.',
    },
    name: {
      control: 'text',
      description: '작성자 이름',
      defaultValue: '홍길동',
    },
    color: {
      control: {
        type: 'select',
        options: ['pink', 'green', 'blue', 'purple', 'gray', 'yellow'], // 색상 옵션 추가
      },
      description: '색깔명',
      defaultValue: 'yellow', // 기본값 설정
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    contents: '이것은 메모입니다. 내용을 여기에 입력하십시오.',
    name: '홍길동',
  },
};

export const WithLongContent: Story = {
  args: {
    contents:
      '이 메모는 내용이 길어 여러 줄로 표시됩니다. 이 부분에 다양한 정보를 입력할 수 있으며, 너무 길어지면 스크롤이 생길 수 있습니다. 사용자가 내용을 모두 볼 수 있도록 적절히 조정되어야 합니다.',
    name: '김철수',
  },
};

export const WithShortContent: Story = {
  args: {
    contents: '짧은 메모입니다.',
    name: '이순신',
  },
};

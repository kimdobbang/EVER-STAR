import { Meta, StoryObj } from '@storybook/react';
import { Puzzle, QuestPuzzleProps } from './Puzzle'; // 경로는 실제 컴포넌트 위치에 맞게 수정하세요.

const meta: Meta<typeof Puzzle> = {
  title: 'Components/Puzzle',
  component: Puzzle,
  argTypes: {
    id: { control: 'text' },
    width: { control: 'number' },
    height: { control: 'number' },
    pieceSize: { control: 'number' },
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive', // 기본 뷰포트를 설정할 수 있습니다.
    },
  },
};

export default meta;

type Story = StoryObj<typeof Puzzle>;

export const Default: Story = {
  args: {
    id: 'puzzle-1',
    width: 500,
    height: 500,
    pieceSize: 100,
  },
};

export const Mobile: Story = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: 'iphonex',
    },
  },
};

export const Desktop: Story = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

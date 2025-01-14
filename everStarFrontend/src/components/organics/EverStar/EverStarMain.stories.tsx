import type { Meta, StoryObj } from '@storybook/react';
import { EverStarMain } from './EverStarMain';

const meta: Meta<typeof EverStarMain> = {
  title: 'Organics/EverStar/EverStarMain',
  component: EverStarMain,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: '현재 위치를 나타내는 제목',
    },
    fill: {
      control: {
        type: 'number',
        min: 0,
        max: 49,
        step: 1,
      },
      description: '진행 상황을 나타내는 값 (0-49)',
    },
    buttonTheme: {
      control: { type: 'radio', options: ['focus', 'hover', 'white'] },
      description: '버튼의 테마',
    },
    buttonSize: {
      control: { type: 'radio', options: ['large', 'medium', 'small'] },
      description: '버튼의 크기',
    },
    buttonDisabled: {
      control: 'boolean',
      description: '버튼의 비활성화 상태',
    },
    buttonText: {
      control: 'text',
      description: '버튼의 텍스트',
    },
    onButtonClick: { action: 'clicked', description: '버튼 클릭 이벤트' },
  },
};

export default meta;

type Story = StoryObj<typeof EverStarMain>;

export const Default: Story = {
  args: {
    title: '뚜뚜',
    fill: 0,
    buttonTheme: 'white',
    buttonSize: 'large',
    buttonDisabled: false,
    buttonText: '지구별로 가기',
  },
};

export const WithProgress: Story = {
  args: {
    title: '뚜뚜의',
    fill: 25,
    buttonTheme: 'focus',
    buttonSize: 'large',
    buttonDisabled: false,
    buttonText: '지구별로 가기',
  },
};

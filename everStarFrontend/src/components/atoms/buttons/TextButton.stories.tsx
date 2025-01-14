import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import TextButton from './TextButton';
const meta = {
  title: 'Atoms/Buttons/TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered',
  },
  decorators: [(Story) => <Story />],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['large', 'midium', 'small'],
      },
      description: '버튼 크기',
      defaultValue: 'large',
    },
    children: {
      control: 'text',
      description: '버튼 text',
      defaultValue: '텍스트 버튼',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      defaultValue: true,
    },
    onClick: { action: 'clicked', description: '버튼 클릭 이벤트' },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'large',
    children: 'Button',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    size: 'large',
    children: 'Button',
    disabled: true,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Buttons/Tag',
  component: Tag,
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
      description: '태그 텍스트',
      defaultValue: '#활발한',
    },
    // 'size'와 'color'와 같은 추가적인 prop을 사용하려면 여기에 추가합니다.
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '#활발한',
  },
};

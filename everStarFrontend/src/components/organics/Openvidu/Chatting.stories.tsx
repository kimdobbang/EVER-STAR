import type { Meta, StoryObj } from '@storybook/react';
import Chatting from './Chatting';

const meta: Meta<typeof Chatting> = {
  title: 'Organics/Chatting',
  component: Chatting,
  tags: ['autodocs'],
  argTypes: {
    userName: {
      control: 'text',
      description: '채팅을 하는 사용자의 이름을 설정합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Anonymous' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          '`Chatting` 컴포넌트는 사용자가 채팅을 주고받을 수 있는 UI를 제공하며, STOMP를 이용해 서버와 실시간으로 통신합니다. `userName` prop을 통해 채팅 사용자 이름을 설정할 수 있습니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Chatting>;

export const Default: Story = {
  args: {
    userName: 'Anonymous',
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 `Chatting` 컴포넌트입니다. 사용자의 이름은 `Anonymous`로 설정되어 있으며, 채팅 UI가 기본적으로 렌더링됩니다.',
      },
    },
  },
};

export const User1: Story = {
  args: {
    userName: 'User1',
  },
  parameters: {
    docs: {
      description: {
        story:
          '`User1`으로 설정된 `Chatting` 컴포넌트입니다. 사용자의 이름이 `User1`로 설정되며, 해당 이름으로 채팅이 표시됩니다.',
      },
    },
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tab, TabProps } from './Tab';

const meta: Meta<typeof Tab> = {
  title: 'Molecules/Tab',
  component: Tab,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tab 컴포넌트는 다양한 탭 요소들을 포함한 컨테이너입니다.',
      },
    },
  },
  argTypes: {
    row: {
      control: {
        type: 'select',
        options: ['two', 'three'],
      },
      description: '탭의 개수',
      defaultValue: 'two',
    },
    activeTab: {
      control: {
        type: 'select',
        options: ['one', 'two', 'three'],
      },
      description: '활성화된 탭',
      defaultValue: 'one',
    },
    className: {
      control: 'text',
      description: '추가적인 클래스 네임',
      defaultValue: '',
    },
    onTabClick: {
      action: 'tab clicked',
      description: '탭 클릭 시 호출되는 함수',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tab>;

const Template = (args: TabProps) => {
  const [activeTab, setActiveTab] = useState<'one' | 'two' | 'three'>('one');

  return <Tab {...args} activeTab={activeTab} onTabClick={setActiveTab} />;
};

export const TwoTabs: Story = {
  args: {
    row: 'two',
    activeTab: 'one',
    className: '',
  },
  render: (args) => <Template {...args} />,
};

export const ThreeTabs: Story = {
  args: {
    row: 'three',
    activeTab: 'one',
    className: '',
  },
  render: (args) => <Template {...args} />,
};

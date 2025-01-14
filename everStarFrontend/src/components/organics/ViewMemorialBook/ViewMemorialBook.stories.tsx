import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ViewMemorialBook, ViewMemorialBookProps } from './ViewMemorialBook';

export default {
  title: 'Organics/Buttons/ViewMemorialBook',
  component: ViewMemorialBook,
  argTypes: {
    toggleStatus: {
      control: { type: 'select', options: ['on', 'off'] },
    },
    isActive: { control: 'boolean' },
    isOpen: { control: 'boolean' },
    isOwner: { control: 'boolean' },
    onToggleChange: { action: 'toggle changed' },
    onClick: { action: 'button clicked' },
  },
} as Meta<typeof ViewMemorialBook>;

type Story = StoryObj<ViewMemorialBookProps>;

export const Default: Story = {
  args: {
    toggleStatus: 'off',
    isActive: true,
    isOpen: true,
    isOwner: true,
  },
};

export const ActiveOwnerWithToggleOn: Story = {
  args: {
    toggleStatus: 'on',
    isActive: true,
    isOpen: true,
    isOwner: true,
  },
};

export const ActiveOwnerWithToggleOff: Story = {
  args: {
    toggleStatus: 'off',
    isActive: true,
    isOpen: true,
    isOwner: true,
  },
};

export const InactiveMemorialBook: Story = {
  args: {
    toggleStatus: 'off',
    isActive: false,
    isOpen: true,
    isOwner: true,
  },
};

export const NonOwnerView: Story = {
  args: {
    toggleStatus: 'off',
    isActive: true,
    isOpen: true,
    isOwner: false,
  },
};

export const ClosedMemorialBook: Story = {
  args: {
    toggleStatus: 'off',
    isActive: true,
    isOpen: false,
    isOwner: true,
  },
};

export const WithToggleInteraction: Story = {
  render: (args) => {
    const [toggleStatus, setToggleStatus] = useState<'on' | 'off'>(
      args.toggleStatus || 'off',
    );

    const handleToggleChange = (status: 'on' | 'off') => {
      setToggleStatus(status);
      args.onToggleChange?.(status); // 상태 변경을 기록하기 위해 액션 호출
    };

    return (
      <ViewMemorialBook
        {...args}
        toggleStatus={toggleStatus}
        onToggleChange={handleToggleChange}
      />
    );
  },
  args: {
    toggleStatus: 'off',
    isActive: true,
    isOpen: true,
    isOwner: true,
  },
};

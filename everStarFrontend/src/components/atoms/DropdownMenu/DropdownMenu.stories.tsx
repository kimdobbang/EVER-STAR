import { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Atoms/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: { type: 'object' },
      description: '드롭다운 옵션 목록',
      defaultValue: ['Option 1', 'Option 2', 'Option 3'],
    },
    onOptionSelect: { action: 'option selected' },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
};

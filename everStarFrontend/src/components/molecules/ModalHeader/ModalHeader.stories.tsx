import { Meta, StoryObj } from '@storybook/react';
import { ModalHeader } from './ModalHeader';

export default {
  title: 'Molecules/ModalHeader',
  tags: ['autodocs'],
  component: ModalHeader,
  argTypes: {
    text: { control: 'text', defaultValue: '오늘의 질문' },
    showLeftIcon: { control: 'boolean', defaultValue: true },
    showRightIcon: { control: 'boolean', defaultValue: false },
    iconSize: {
      control: { type: 'select', options: [16, 24] },
      defaultValue: 24,
    },
    iconColor: {
      control: {
        type: 'select',
        options: ['black', 'gray', 'white', 'orange'],
      },
      defaultValue: 'black',
    },
    iconHover: { control: 'boolean', defaultValue: true },
    onLeftIconClick: { action: 'left icon clicked' },
    onRightIconClick: { action: 'right icon clicked' },
  },
} as Meta<typeof ModalHeader>;

type Story = StoryObj<typeof ModalHeader>;

export const Default: Story = {
  args: {
    text: '오늘의 질문',
    showLeftIcon: true,
    showRightIcon: false,
    iconSize: 24,
    iconColor: 'black',
    iconHover: true,
  },
};

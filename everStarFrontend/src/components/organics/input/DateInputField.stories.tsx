import { Meta, StoryObj } from '@storybook/react';
import { DateInputField, DateInputFieldProps } from './DateInputField';

const meta: Meta<DateInputFieldProps> = {
  title: 'Organics/Input/DateInputField',
  component: DateInputField,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'radio',
      options: ['default', 'focus', 'disable', 'done', 'error'],
      description: 'The state of the input field',
    },
    date: {
      control: 'date',
      description: 'The selected date',
    },
  },
};

export default meta;

type Story = StoryObj<DateInputFieldProps>;

export const Default: Story = {
  args: {
    label: '생년월일',
    showLabel: true,
    showValidationText: true,
    starshow: true,
    state: 'default',
    date: new Date(),
    placeholder: '생년월일을 선택하세요',
  },
};

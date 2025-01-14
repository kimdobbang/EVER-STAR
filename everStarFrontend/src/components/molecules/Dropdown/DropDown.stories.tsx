import { Meta, StoryObj } from '@storybook/react';
import { DropDown } from './Dropdown';

const meta: Meta<typeof DropDown> = {
  title: 'Molecules/DropDown',
  component: DropDown,
  argTypes: {
    type: {
      control: { type: 'radio', options: ['gender', 'year'] },
      description: 'Type of the DropDown to display',
    },
    title: {
      control: 'text',
      description: 'Title of the DropDown',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DropDown>;

export const GenderDropDown: Story = {
  args: {
    type: 'gender',
    title: 'Select Gender',
  },
};

export const YearDropDown: Story = {
  args: {
    type: 'year',
    title: 'Select Year',
  },
};

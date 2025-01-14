import { Meta, StoryObj } from '@storybook/react';
import { Rainbow } from './Rainbow';

const meta: Meta<typeof Rainbow> = {
  title: 'Atoms/Symbols/Rainbow',
  component: Rainbow,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: [
          'none',
          'yellow',
          'violet',
          'blue',
          'green',
          'orange',
          'red',
          'indigo',
        ],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Rainbow>;

export const Default: Story = {
  args: {
    color: 'none',
    className: '',
  },
};

export const Yellow: Story = {
  args: {
    color: 'yellow',
    className: '',
  },
};

export const Violet: Story = {
  args: {
    color: 'violet',
    className: '',
  },
};

export const Blue: Story = {
  args: {
    color: 'blue',
    className: '',
  },
};

export const Green: Story = {
  args: {
    color: 'green',
    className: '',
  },
};

export const Orange: Story = {
  args: {
    color: 'orange',
    className: '',
  },
};

export const Red: Story = {
  args: {
    color: 'red',
    className: '',
  },
};

export const Indigo: Story = {
  args: {
    color: 'indigo',
    className: '',
  },
};

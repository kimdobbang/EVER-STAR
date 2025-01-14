import type { Meta, StoryObj } from '@storybook/react';
import { SettingsIcon } from './SettingsIcon';

const meta: Meta<typeof SettingsIcon> = {
  title: 'Atoms/Icons/SettingsIcon',
  component: SettingsIcon,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio', options: [16, 24] },
    },
    color: {
      control: { type: 'radio', options: ['black', 'gray', 'white', 'orange'] },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SettingsIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

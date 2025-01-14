import type { Meta, StoryObj } from '@storybook/react';
import { ProfileIcon } from './ProfileIcon';

const meta: Meta<typeof ProfileIcon> = {
  title: 'Atoms/Icons/ProfileIcon',
  component: ProfileIcon,
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
type Story = StoryObj<typeof ProfileIcon>;

export const Default: Story = {
  args: {
    size: 24,
    color: 'black',
  },
};

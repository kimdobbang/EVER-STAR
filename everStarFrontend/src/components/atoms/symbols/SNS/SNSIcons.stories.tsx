import type { Meta, StoryObj } from '@storybook/react';
import { SNSIcons } from './SNSIcons';

const meta: Meta<typeof SNSIcons> = {
  title: 'Atoms/Symbols/SNSIcons',
  component: SNSIcons,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'radio',
        options: [
          'google',
          'kakao',
          'notion',
          'youtube',
          'instagram',
          'patron',
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SNSIcons>;

export const Default: Story = {
  args: {
    variant: 'google',
  },
};

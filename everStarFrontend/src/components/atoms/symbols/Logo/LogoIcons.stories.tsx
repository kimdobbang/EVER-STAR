import type { Meta, StoryObj } from '@storybook/react';
import { LogoIcons } from './LogoIcons';

const meta: Meta<typeof LogoIcons> = {
  title: 'Atoms/Symbols/LogoIcons',
  component: LogoIcons,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'radio',
        options: [
          'earth',
          'small-earth',
          'small-earth-img',
          'vertical-earth',
          'small-star',
          'star',
          'small-star-img',
          'vertical-star',
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LogoIcons>;

export const Default: Story = {
  args: {
    variant: 'earth',
  },
};

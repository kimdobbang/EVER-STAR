import { Meta, StoryObj } from '@storybook/react';
import { PostItPlusCard } from 'components/molecules/cards/PostItPlusCard/PostItPlusCard';

const meta: Meta<typeof PostItPlusCard> = {
  title: 'Molecules/Card/PostItPlusCard',
  component: PostItPlusCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

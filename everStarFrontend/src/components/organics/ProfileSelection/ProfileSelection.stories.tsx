// src/components/organics/ProfileSelection/ProfileSelection.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { ProfileSelection, ProfileSelectionProps } from './ProfileSelection';
import { action } from '@storybook/addon-actions';

const meta: Meta<ProfileSelectionProps> = {
  title: 'Organics/ProfileSelection',
  component: ProfileSelection,
  tags: ['autodocs'],
  args: {
    avatars: [
      {
        id: 1,
        src: '',
        size: 'medium',
        name: '피카츄',
      },
      {
        id: 2,
        src: '',
        size: 'medium',
        name: '라이츄',
      },
      {
        id: 3,
        src: '',
        size: 'medium',
        name: '파이리',
      },
    ],
    onAddAvatar: () => alert('Add Avatar button clicked!'),
    onAvatarClick: action('onAvatarClick'),
  },
};

export default meta;

type Story = StoryObj<ProfileSelectionProps>;

export const Default: Story = {
  args: {
    ...meta.args,
  },
};

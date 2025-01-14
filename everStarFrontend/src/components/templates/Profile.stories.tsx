import { Meta, StoryObj } from '@storybook/react';
import { Profile } from './Profile';

const meta: Meta<typeof Profile> = {
  title: 'Templates/Profile',
  component: Profile,
  parameters: {
    viewport: {
      viewports: {
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
      },
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Profile>;

export const Default: Story = {
  args: {},
};

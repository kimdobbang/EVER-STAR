import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Login } from './Login';

const meta: Meta<typeof Login> = {
  title: 'Templates/Login',
  component: Login,
  tags: ['autodocs'],
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
};

export default meta;

type Story = StoryObj<typeof Login>;

export const Default: Story = {
  render: (args) => <Login {...args} />,
};

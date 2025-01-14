import type { Meta, StoryObj } from '@storybook/react';
import { EarthMain } from './EarthMain';

const meta: Meta<typeof EarthMain> = {
  title: 'Templates/EarthMain',
  component: EarthMain,
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

type Story = StoryObj<typeof EarthMain>;

export const Default: Story = {
  args: {
    title: '뚜뚜',
    fill: 0,
    buttonSize: 'large',
    buttonDisabled: false,
    buttonText: '영원별로 가기',
    buttonIcon: 'SmallStarImg',
    onButtonClick: () => alert('Button Clicked'),
  },
};

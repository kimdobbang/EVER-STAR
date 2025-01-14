import type { Meta, StoryObj } from '@storybook/react';
import { WeatherIcon } from './WeatherIcon';

const meta: Meta<typeof WeatherIcon> = {
  title: 'Atoms/Icons/WeatherIcon',
  component: WeatherIcon,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['thunder', 'sun', 'rain', 'cloud', 'wind'],
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'WeatherIcon component displays various weather icons based on the type prop.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WeatherIcon>;

export const Default: Story = {
  args: {
    type: 'sun',
  },
};

export const Thunder: Story = {
  args: {
    type: 'thunder',
  },
};

export const Rain: Story = {
  args: {
    type: 'rain',
  },
};

export const Cloud: Story = {
  args: {
    type: 'cloud',
  },
};

export const Wind: Story = {
  args: {
    type: 'wind',
  },
};

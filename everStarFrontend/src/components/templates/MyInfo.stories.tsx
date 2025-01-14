import type { Meta, StoryObj } from '@storybook/react';
import { MyInfo } from 'components/templates/MyInfo';
import { Provider } from 'react-redux';
import { Store } from 'store/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from 'store/Store';

const meta: Meta<typeof MyInfo> = {
  title: 'Templates/MyInfo',
  component: MyInfo,
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

type Story = StoryObj<typeof MyInfo>;

export const Default: Story = {
  render: (args) => (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <MyInfo {...args} />
      </PersistGate>
    </Provider>
  ),
  args: {},
};

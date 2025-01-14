import React from 'react';
import type { Preview } from '@storybook/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // react-query import 추가
import '../src/index.css';
import { Store } from '../src/store/Store';

const queryClient = new QueryClient(); // QueryClient 생성

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <Provider store={Store}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Story />
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    ),
  ],
};

export default preview;

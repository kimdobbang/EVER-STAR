import type { Meta, StoryObj } from '@storybook/react';
import { LetterBox } from './LetterBox'; // 정확한 경로로 변경해야 합니다.

const meta: Meta<typeof LetterBox> = {
  title: 'Organics/LetterBox',
  component: LetterBox,
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

type Story = StoryObj<typeof LetterBox>;

export const Default: Story = {
  args: {
    letters: [
      {
        id: 1,
        type: 'default',
        color: 'white',
        state: 'notReceived',
        name: 'John Doe',
        sendMessage: '안녕하세요!',
        dateTime: '2024-08-01',
      },
      {
        id: 2,
        type: 'default',
        color: 'bgorange',
        state: 'received',
        name: 'Jane Smith',
        sendMessage: '반갑습니다!',
        dateTime: '2024-08-01',
      },
      // Add more letter data as needed
    ],
    onLetterClick: (id: number) => alert(`Letter with id ${id} clicked`),
    currentPage: 1,
    itemsPerPage: 6, // Example value, adjust as needed
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: {
    letters: [
      {
        id: 1,
        type: 'default',
        color: 'white',
        state: 'notReceived',
        name: 'John Doe',
        sendMessage: '안녕하세요!',
        dateTime: '2024-08-01',
      },
      {
        id: 2,
        type: 'default',
        color: 'bgorange',
        state: 'received',
        name: 'Jane Smith',
        sendMessage: '반갑습니다!',
        dateTime: '2024-08-01',
      },
      // Add more letter data as needed
    ],
    onLetterClick: (id: number) => alert(`Letter with id ${id} clicked`),
    currentPage: 1,
    itemsPerPage: 6, // Example value, adjust as needed
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
  args: {
    letters: [
      {
        id: 1,
        type: 'default',
        color: 'white',
        state: 'notReceived',
        name: 'John Doe',
        sendMessage: '안녕하세요!',
        dateTime: '2024-08-01',
      },
      {
        id: 2,
        type: 'default',
        color: 'bgorange',
        state: 'received',
        name: 'Jane Smith',
        sendMessage: '반갑습니다!',
        dateTime: '2024-08-01',
      },
      // Add more letter data as needed
    ],
    onLetterClick: (id: number) => alert(`Letter with id ${id} clicked`),
    currentPage: 1,
    itemsPerPage: 2, // Example value, adjust as needed
  },
};

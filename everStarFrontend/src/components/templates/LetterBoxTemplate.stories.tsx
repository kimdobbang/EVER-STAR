import type { Meta, StoryObj } from '@storybook/react';
import { LetterBoxTemplate } from './LetterBoxTemplate';
import { action } from '@storybook/addon-actions';
import {
  LetterColor,
  LetterState,
} from 'components/molecules/cards/LetterCard/LetterCard';

const generateLargeLetterData = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    type: 'default' as const,
    color: (index % 2 === 0 ? 'white' : 'bgorange') as LetterColor,
    state: (index % 2 === 0 ? 'notReceived' : 'received') as LetterState,
    name: `Sender ${index + 1}`,
    sendMessage: `Message content ${index + 1}`,
    dateTime: `2024-08-${(index % 31) + 1}`,
  }));
};

const meta: Meta<typeof LetterBoxTemplate> = {
  title: 'templates/LetterBoxTemplate',
  component: LetterBoxTemplate,
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
  argTypes: {
    currentPage: {
      control: 'number',
      description: '현재 페이지 번호',
      defaultValue: 1,
    },
    totalPages: {
      control: 'number',
      description: '전체 페이지 수',
      defaultValue: 1,
    },
    onPageChange: {
      action: 'pageChanged',
      description: '페이지 변경 시 호출되는 함수',
    },
    headerText: {
      control: 'text',
      description: '헤더에 표시될 텍스트',
      defaultValue: '편지함',
    },
    letterData: {
      control: 'object',
      description: '편지 데이터',
      defaultValue: [
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
    },
  },
};

export default meta;

type Story = StoryObj<typeof LetterBoxTemplate>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: action('pageChanged'),
    headerText: '편지함',
    letterData: [
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
  },
};

export const Empty: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: action('pageChanged'),
    headerText: '편지함 - 비어있음',
    letterData: [],
  },
};

export const ErrorState: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: action('pageChanged'),
    headerText: '편지함 - 오류',
    letterData: [
      // Simulate an error state with some placeholder data
      {
        id: 1,
        type: 'default',
        color: 'gray',
        state: 'notReceived',
        name: 'Error',
        sendMessage: '편지를 불러오는 데 실패했습니다.',
        dateTime: '2024-08-01',
      },
    ],
  },
};

export const LargeData: Story = {
  args: {
    currentPage: 1,
    totalPages: Math.ceil(50 / 6), // 예를 들어 6개씩 나뉘면 9페이지
    onPageChange: action('pageChanged'),
    headerText: '편지함 - 많은 데이터',
    letterData: generateLargeLetterData(50),
  },
};

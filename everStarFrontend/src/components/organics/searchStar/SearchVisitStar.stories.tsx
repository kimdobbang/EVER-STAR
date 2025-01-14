import { Meta, StoryObj } from '@storybook/react';
import { SearchVisitStar, SearchVisitStarProps } from './SearchVisitStar';

const meta: Meta<SearchVisitStarProps> = {
  title: 'Organics/SearchVisitStar',
  component: SearchVisitStar,
  argTypes: {
    isOpen: { control: 'boolean', defaultValue: true },
    text: { control: 'text', defaultValue: '방문할 영원별 찾기' },
    height: { control: 'text', defaultValue: '800px' },
  },
};

export default meta;

type Story = StoryObj<SearchVisitStarProps>;

export const Default: Story = {
  args: {
    isOpen: true,
    text: '방문할 영원별 찾기',
    onVerify: (code) => console.log('Verified code:', code),
    onClose: () => console.log('Modal closed'),
  },
};

export const WithMockData: Story = {
  args: {
    isOpen: true,
    text: '방문할 영원별 찾기',
    onVerify: (code) => console.log('Verified code:', code),
    onClose: () => console.log('Modal closed'),
  },
  parameters: {
    mockData: [
      {
        url: '/api/everstar/pets/search',
        method: 'GET',
        status: 200,
        response: {
          data: {
            content: [
              {
                id: 2027,
                petName: '정현조',
                userName: '김*이',
                email: 'k*********@gmail.com',
              },
            ],
          },
        },
      },
    ],
  },
};

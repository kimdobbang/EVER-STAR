import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { CheerMessage } from './CheerMessage';

export default {
  title: 'Organics/CheerMessage/CheerMessage',
  component: CheerMessage,
} as Meta;

const Template: StoryFn = (args) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <CheerMessage
      profile={{
        name: '1',
        age: 10,
        date: '',
        description: '',
        tagList: [],
        avatarUrl: '',
      }}
      postItCards={[]}
      totalPages={0}
      {...args}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  profile: {
    name: '홍길동',
    age: 5,
    date: '2023-07-25',
    description: '사랑스러운 반려동물입니다.',
    tagList: ['쾌활한', '귀여운', '애교많은'],
    avatarUrl: 'https://example.com/avatar.jpg',
  },
  postItCards: [
    { contents: '할 수 있어!', name: 'Alice', color: 'pink' },
    { contents: '계속 진행해!', name: 'Bob', color: 'green' },
    { contents: '훌륭해!', name: 'Charlie', color: 'blue' },
    { contents: '잘 하고 있어!', name: 'David', color: 'yellow' },
    { contents: '힘내!', name: 'Eve', color: 'purple' },
    { contents: '조금 더 힘내자!', name: 'Frank', color: 'gray' },
    { contents: '너라면 할 수 있어!', name: 'Grace', color: 'pink' },
    { contents: '파이팅!', name: 'Heidi', color: 'green' },
    { contents: '멋져!', name: 'Ivan', color: 'blue' },
    { contents: '굉장해!', name: 'Judy', color: 'yellow' },
    { contents: '좋아!', name: 'Karl', color: 'purple' },
    { contents: '탁월해!', name: 'Leo', color: 'gray' },
    { contents: '잘했어!', name: 'Mallory', color: 'pink' },
  ],
  totalPages: 1,
};

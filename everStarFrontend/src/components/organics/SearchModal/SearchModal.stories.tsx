import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SearchModal } from './SearchModal';

const meta: Meta<typeof SearchModal> = {
  title: 'Organics/SearchModal',
  component: SearchModal,
  tags: ['autodocs'],
  args: {
    searchOptions: [
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 2',
      'Option 3',
      'Option 2',
      'Option 3',
      'Option 2',
      'Option 3',
      'Option 2',
      'Option 3',
    ],
    modalTitle: 'Search Modal',
    buttonLabel: '버튼',
  },
};

export default meta;

type Story = StoryObj<typeof SearchModal>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    const handleClose = () => setIsOpen(false);

    return isOpen ? <SearchModal {...args} onClose={handleClose} /> : <></>;
  },
};

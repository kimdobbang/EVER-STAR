import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalProps } from 'components/molecules/Modal/Modal';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { ArrowIcon } from 'components/atoms/icons/Arrow/ArrowIcon';

export default {
  title: 'Molecules/Modal',
  tags: ['autodocs'],
  component: Modal,
  argTypes: {
    isOpen: { control: 'boolean', defaultValue: true },
    text: { control: 'text', defaultValue: 'Modal Title' },
    showLeftIcon: { control: 'boolean', defaultValue: true },
    showRightIcon: { control: 'boolean', defaultValue: false },
    iconSize: {
      control: { type: 'select', options: [16, 24] },
      defaultValue: 24,
    },
    iconColor: {
      control: {
        type: 'select',
        options: ['black', 'gray', 'white', 'orange'],
      },
      defaultValue: 'black',
    },
    iconHover: { control: 'boolean', defaultValue: true },
  },
} as Meta<ModalProps>;

type Story = StoryObj<ModalProps>;

export const Default: Story = {
  render: (args) => (
    <div>
      <Modal {...args}>
        <p>This is the modal content.</p>
        <div className='flex justify-end w-full'>
          <PrimaryButton
            theme='white'
            size='large'
            onClick={() => console.log('Primary Button Clicked')}
            disabled={false}
            icon={<ArrowIcon color='black' direction='right' size={24} />}
            hug={true}
          >
            {''}
          </PrimaryButton>
        </div>
      </Modal>
    </div>
  ),
  args: {
    isOpen: true,
    text: 'Modal Title',
    showLeftIcon: true,
    showRightIcon: false,
    iconSize: 24,
    iconColor: 'black',
    iconHover: true,
    onClose: () => console.log('Modal closed'),
  },
};

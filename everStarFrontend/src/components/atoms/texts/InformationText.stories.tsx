import type { Meta, StoryObj } from '@storybook/react';
import { InformationText } from './InformationText';

const meta: Meta<typeof InformationText> = {
  title: 'Atoms/Texts/InformationText',
  component: InformationText,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    state: {
      control: {
        type: 'select',
        options: ['default', 'error'],
      },
      description: 'Label의 상태',
      defaultValue: 'default',
    },
    children: {
      control: 'text',
      description: 'Label에 표시할 텍스트',
      defaultValue: '2019-10-08 09:38:07',
    },
    className: {
      control: 'text',
      description: '추가적인 클래스 이름',
      defaultValue: '',
    },
    divClassName: {
      control: 'text',
      description: '내부 div에 추가할 클래스 이름',
      defaultValue: '',
    },
    align: {
      control: {
        type: 'select',
        options: ['left', 'center', 'right'],
      },
      description: '텍스트 정렬',
      defaultValue: 'center',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InformationText>;

export const Default: Story = {
  args: {
    state: 'default',
    children: '2019-10-08 09:38:07',
    className: '',
    divClassName: '',
    align: 'center',
  },
};

export const Error: Story = {
  args: {
    state: 'error',
    children: 'Error: Please check your input.',
    className: '',
    divClassName: '',
    align: 'center',
  },
};

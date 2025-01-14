// src/components/organics/Profile/UserInfoTab.stories.tsx
import { Meta, StoryObj } from '@storybook/react';
import { UserInfoTab, UserInfoTabProps } from './UserInfoTab';
import { action } from '@storybook/addon-actions';

const meta: Meta<UserInfoTabProps> = {
  title: 'Organics/UserInfoTab',
  component: UserInfoTab,
  tags: ['autodocs'],
  args: {
    userInfo: {
      name: '홍길동',
      birthdate: '1990-01-01',
      gender: '남성',
      email: 'honggildong@example.com',
      phone: '010-1234-5678',
    },
    smallButtonText: '핸드폰 번호 수정하기',
    onButtonClick: action('onButtonClick'),
  },
};

export default meta;

type Story = StoryObj<UserInfoTabProps>;

export const Default: Story = {
  args: {
    ...meta.args,
  },
};

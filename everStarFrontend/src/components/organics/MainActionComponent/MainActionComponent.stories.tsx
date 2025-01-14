import type { Meta, StoryObj } from '@storybook/react';
import {
  MainActionComponent,
  MainActionComponentProps,
} from './MainActionComponent';

export default {
  title: 'Organics/MainActionComponent',
  component: MainActionComponent,
  tags: ['autodocs'], // Automatically generate documentation tags
} as Meta<MainActionComponentProps>;

type Story = StoryObj<MainActionComponentProps>;

export const EarthView: Story = {
  args: {
    type: 'earth',
    profileImageUrl: '',
    fill: 25,
    toggleStatus: 'off',
    memorialBookProfile: {
      id: 1, // 추가된 id 속성
      isActive: true,
      isOpen: false,
    },
    isOwner: true,
  },
};

export const EverstarView: Story = {
  args: {
    type: 'everstar',
    profileImageUrl: '',
    fill: 45,
    toggleStatus: 'on',
    memorialBookProfile: {
      id: 2, // 추가된 id 속성
      isActive: true,
      isOpen: true,
    },
    isOwner: true,
    name: 'John Doe',
    age: 30,
    description: 'Loving memory',
  },
};

export const EverstarViewNotOwner: Story = {
  args: {
    type: 'everstar',
    profileImageUrl: '',
    fill: 30,
    toggleStatus: 'off',
    memorialBookProfile: {
      id: 3, // 추가된 id 속성
      isActive: true,
      isOpen: false,
    },
    isOwner: false,
    name: 'Jane Doe',
    age: 28,
    description: 'Remembering always',
  },
};

export const EarthViewWithQuest: Story = {
  args: {
    type: 'earth',
    profileImageUrl: '',
    fill: 10,
    toggleStatus: undefined,
    memorialBookProfile: undefined,
    isOwner: undefined,
    // Quest 관련 설정을 args에 포함시킵니다.
  },
};

export {};

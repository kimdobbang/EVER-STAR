import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingDescription } from './OnboardingDescription';

const meta: Meta<typeof OnboardingDescription> = {
  title: 'Organics/OnboardingDescription',
  component: OnboardingDescription,
  tags: ['autodocs'],
  argTypes: {
    page: {
      control: { type: 'radio', options: ['page-1', 'page-2', 'page-3', 'page-4'] },
      description:
        '페이지 종류를 설정합니다. 각 페이지는 고유한 제목, 설명, 세부 사항을 제공합니다.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'page-1' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'OnboardingDescription 컴포넌트는 온보딩 과정에서 보여지는 설명 페이지입니다. `page` prop을 통해 페이지 종류를 설정할 수 있으며, 각 페이지는 고유한 제목, 설명, 세부 사항 및 페이지 네비게이션을 제공합니다. 페이지 네비게이션은 페이지 수에 따라 다르게 표시됩니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof OnboardingDescription>;

export const Page1: Story = {
  args: {
    page: 'page-1',
  },
  parameters: {
    docs: {
      description: {
        story:
          '`page-1` 설정된 OnboardingDescription 컴포넌트입니다. 이 페이지는 퀘스트와 관련된 정보를 제공하며, 페이지 네비게이션은 단일 점을 표시합니다.',
      },
    },
  },
};

export const Page2: Story = {
  args: {
    page: 'page-2',
  },
  parameters: {
    docs: {
      description: {
        story:
          '`page-2` 설정된 OnboardingDescription 컴포넌트입니다. 이 페이지는 반려동물에게 편지를 보낼 수 있는 정보를 제공하며, 페이지 네비게이션은 두 개의 점 중 첫 번째 점이 활성화된 상태를 표시합니다.',
      },
    },
  },
};

export const Page3: Story = {
  args: {
    page: 'page-3',
  },
  parameters: {
    docs: {
      description: {
        story:
          '`page-3` 설정된 OnboardingDescription 컴포넌트입니다. 이 페이지는 메모리얼 북을 제작하는 방법에 대한 정보를 제공하며, 페이지 네비게이션은 세 개의 점 중 첫 번째 점이 활성화된 상태를 표시합니다.',
      },
    },
  },
};

export const Page4: Story = {
  args: {
    page: 'page-4',
  },
  parameters: {
    docs: {
      description: {
        story:
          '`page-4` 설정된 OnboardingDescription 컴포넌트입니다. 이 페이지는 응원 메시지를 받는 방법에 대한 정보를 제공하며, 페이지 네비게이션은 네 개의 점 중 첫 번째 점이 활성화된 상태를 표시합니다.',
      },
    },
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { CardProgress } from './CardProgress';

const meta: Meta<typeof CardProgress> = {
  title: 'Organics/CardProgress',
  component: CardProgress,
  tags: ['autodocs'],
  argTypes: {
    fill: {
      control: { type: 'number', min: 0, max: 49, step: 1 },
      description: '진행 상황을 나타내는 값 (0-49)',
      table: {
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '0',
        },
      },
    },
    className: {
      control: { type: 'text' },
      description: '추가적인 CSS 클래스',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: '',
        },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'CardProgress 컴포넌트는 진행 상황을 시각적으로 표시하고 관련 메시지를 제공합니다. `fill` prop을 통해 진행 상황을 설정할 수 있습니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardProgress>;

export const Default: Story = {
  args: {
    className: '',
    fill: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 CardProgress 컴포넌트입니다. `fill` 값을 0으로 설정했습니다.',
      },
    },
  },
};

export const Fill6: Story = {
  args: {
    className: '',
    fill: 6,
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 6으로 설정한 CardProgress 컴포넌트입니다.',
      },
    },
  },
};

export const Fill13: Story = {
  args: {
    className: '',
    fill: 13,
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 13으로 설정한 CardProgress 컴포넌트입니다.',
      },
    },
  },
};

export const Fill20: Story = {
  args: {
    className: '',
    fill: 20,
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 20으로 설정한 CardProgress 컴포넌트입니다.',
      },
    },
  },
};

export const Fill27: Story = {
  args: {
    className: '',
    fill: 27,
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 27으로 설정한 CardProgress 컴포넌트입니다.',
      },
    },
  },
};

export const Fill34: Story = {
  args: {
    className: '',
    fill: 34,
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 34으로 설정한 CardProgress 컴포넌트입니다.',
      },
    },
  },
};

export const Fill41: Story = {
  args: {
    className: '',
    fill: 41,
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 41으로 설정한 CardProgress 컴포넌트입니다.',
      },
    },
  },
};

export const Fill48: Story = {
  args: {
    className: '',
    fill: 48,
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 48으로 설정한 CardProgress 컴포넌트입니다.',
      },
    },
  },
};

export const Fill49: Story = {
  args: {
    className: '',
    fill: 49,
  },
  parameters: {
    docs: {
      description: {
        story: '`fill` 값을 49으로 설정한 CardProgress 컴포넌트입니다.',
      },
    },
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { LetterText } from './LetterText';

const meta: Meta<typeof LetterText> = {
  title: 'Atoms/Texts/LetterText',
  component: LetterText,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['large', 'medium', 'small', 'xl'],
      },
      description: 'Label의 크기',
      defaultValue: 'medium',
    },
    color: {
      control: {
        type: 'select',
        options: ['black', 'gray', 'white'],
      },
      description: 'Label의 색상',
      defaultValue: 'black',
    },
    children: {
      control: 'text',
      description: 'Label의 텍스트',
      defaultValue: 'Sample Text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
    color: 'black',
    children: 'Sample Text',
  },
};

export const XlBlack: Story = {
  args: {
    size: 'xl',
    color: 'black',
    children: 'Large Black Text',
  },
};

export const LargeBlack: Story = {
  args: {
    size: 'large',
    color: 'black',
    children: 'Large Black Text',
  },
};

export const MediumGray: Story = {
  args: {
    size: 'medium',
    color: 'gray',
    children: 'Medium Gray Text',
  },
};

export const SmallWhite: Story = {
  args: {
    size: 'small',
    color: 'white',
    children: 'Small White Text',
  },
};

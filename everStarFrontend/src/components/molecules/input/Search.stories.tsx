import { fn } from '@storybook/test';
import { Search } from './Search';
export const ActionsData = {
  onArchiveTask: fn(),
  onPinTask: fn(),
};

export default {
  component: Search,
  title: 'Molecules/Search',
  tags: ['autodocs'],
  //👇 Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData,
  },
  argTypes: {
    initialState: {
      control: 'radio',
      options: ['disable', 'focus', 'default'],
    },
    className: {
      control: 'text',
    },
    placeholderButtonTextIcon: {
      control: false,
    },
    options: {
      control: 'array',
    },
  },
};

export const Default = {
  args: {
    initialState: 'default',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
};

export const Focus = {
  args: {
    initialState: 'focus',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
};

export const Disable = {
  args: {
    initialState: 'disable',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
};

export const WithCustomClass = {
  args: {
    initialState: 'default',
    className: 'custom-class',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
};

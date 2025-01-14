import { Meta, StoryObj } from '@storybook/react';
import { SignUp } from './SignUp';

const meta: Meta = {
  title: 'Pages/SignUp',
  component: SignUp,
  tags: ['autodocs'],
  argTypes: {
    onSignUpButtonClick: { action: 'signUpButtonClicked' },
    onCloseModal: { action: 'modalClosed' },
    onResend: { action: 'resendClicked' },
    onVerifyAndJoin: { action: 'verifyAndJoinClicked' },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

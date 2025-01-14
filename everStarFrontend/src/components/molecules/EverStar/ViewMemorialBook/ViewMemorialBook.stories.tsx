import type { Meta, StoryObj } from "@storybook/react";
import ProgressWithButton from "./ProgressWithButton";

const meta: Meta<typeof ProgressWithButton> = {
  title: "Molecules/EverStar/ProgressWithButton",
  component: ProgressWithButton,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "360px", height: "100px" }}>
        {" "}
        {/* 충분한 높이 제공 */}
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    fill: {
      control: {
        type: "number",
        min: 0,
        max: 49,
        step: 1,
      },
      description: "진행 상황을 나타내는 값 (0-49)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressWithButton>;

export const Fill0: Story = {
  args: {
    fill: 0,
  },
};

export const Fill24: Story = {
  args: {
    fill: 24,
  },
};

export const Fill49: Story = {
  args: {
    fill: 49,
  },
};

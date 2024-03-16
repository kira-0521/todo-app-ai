import type { Meta, StoryObj } from "@storybook/react";

import { CreateStatus } from ".";

const meta: Meta<typeof CreateStatus> = {
	component: CreateStatus,
};
export default meta;
type Story = StoryObj<typeof CreateStatus>;

export const Default: Story = { args: { children: "Hello, World!" } };

import type { Meta, StoryObj } from "@storybook/react";

import { CreateTask } from ".";

const meta: Meta<typeof CreateTask> = {
	component: CreateTask,
};
export default meta;
type Story = StoryObj<typeof CreateTask>;

export const Default: Story = { args: { children: "Hello, World!" } };

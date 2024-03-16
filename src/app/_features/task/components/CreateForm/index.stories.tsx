import type { Meta, StoryObj } from "@storybook/react";

import { CreateTaskForm } from ".";

const meta: Meta<typeof CreateTaskForm> = {
	component: CreateTaskForm,
};
export default meta;
type Story = StoryObj<typeof CreateTaskForm>;

export const Default: Story = { args: { children: "Hello, World!" } };

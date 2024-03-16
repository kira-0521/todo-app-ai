import type { Meta, StoryObj } from "@storybook/react";

import { CreateTaskFromAIForm } from ".";

const meta: Meta<typeof CreateTaskFromAIForm> = {
	component: CreateTaskFromAIForm,
};
export default meta;
type Story = StoryObj<typeof CreateTaskFromAIForm>;

export const Default: Story = { args: { children: "Hello, World!" } };

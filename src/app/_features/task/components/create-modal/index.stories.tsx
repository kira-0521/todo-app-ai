import type { Meta, StoryObj } from "@storybook/react";

import { CreateModal } from ".";

const meta: Meta<typeof CreateModal> = {
	component: CreateModal,
};
export default meta;
type Story = StoryObj<typeof CreateModal>;

export const Default: Story = { args: { children: "Hello, World!" } };

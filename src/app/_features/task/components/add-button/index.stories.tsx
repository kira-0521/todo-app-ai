import type { Meta, StoryObj } from "@storybook/react";

import { AddButton } from ".";

const meta: Meta<typeof AddButton> = {
	component: AddButton,
};
export default meta;
type Story = StoryObj<typeof AddButton>;

export const Default: Story = { args: { children: "Hello, World!" } };

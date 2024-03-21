import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from ".";

const meta: Meta<typeof Menu> = {
	component: Menu,
};
export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = { args: { children: "Hello, World!" } };

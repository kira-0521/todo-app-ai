import type { Meta, StoryObj } from "@storybook/react";

import { StatusPanel } from ".";

const meta: Meta<typeof StatusPanel> = {
	component: StatusPanel,
};
export default meta;
type Story = StoryObj<typeof StatusPanel>;

export const Default: Story = { args: { children: "Hello, World!" } };

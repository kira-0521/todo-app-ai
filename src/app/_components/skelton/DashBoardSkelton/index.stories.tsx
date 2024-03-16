import type { Meta, StoryObj } from "@storybook/react";

import { DashBoardSkelton } from ".";

const meta: Meta<typeof DashBoardSkelton> = {
	component: DashBoardSkelton,
};
export default meta;
type Story = StoryObj<typeof DashBoardSkelton>;

export const Default: Story = { args: { children: "Hello, World!" } };

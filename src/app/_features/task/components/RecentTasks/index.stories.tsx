import type { Meta, StoryObj } from "@storybook/react";

import { RecentTasks } from ".";

const meta: Meta<typeof RecentTasks> = {
	component: RecentTasks,
};
export default meta;
type Story = StoryObj<typeof RecentTasks>;

export const Default: Story = {};

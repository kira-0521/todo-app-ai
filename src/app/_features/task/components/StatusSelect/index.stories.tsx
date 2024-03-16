import type { Meta, StoryObj } from "@storybook/react";

import { StatusSelect } from ".";

const meta: Meta<typeof StatusSelect> = {
	component: StatusSelect,
};
export default meta;
type Story = StoryObj<typeof StatusSelect>;

export const Default: Story = {};

import type { Meta, StoryObj } from "@storybook/react";

import { Detail } from ".";

const meta: Meta<typeof Detail> = {
	component: Detail,
};
export default meta;
type Story = StoryObj<typeof Detail>;

export const Default: Story = {};

import type { Meta, StoryObj } from "@storybook/react";

import { DetailDrawer } from ".";

const meta: Meta<typeof DetailDrawer> = {
	component: DetailDrawer,
};
export default meta;
type Story = StoryObj<typeof DetailDrawer>;

export const Default: Story = {};

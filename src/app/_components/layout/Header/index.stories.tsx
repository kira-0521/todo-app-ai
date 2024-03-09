import type { Meta, StoryObj } from "@storybook/react";

import { Header } from ".";

const meta: Meta<typeof Header> = {
	component: Header,
};
export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
	args: {
		avatar: "https://avatars.githubusercontent.com/u/44550746?v=4",
		username: "jacob-ebey",
	},
};

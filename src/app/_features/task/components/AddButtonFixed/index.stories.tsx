import type { Meta, StoryObj } from "@storybook/react";

import { AddButtonFixed } from ".";

const meta: Meta<typeof AddButtonFixed> = {
	component: AddButtonFixed,
};
export default meta;
type Story = StoryObj<typeof AddButtonFixed>;

export const Default: Story = { args: { children: "Hello, World!" } };

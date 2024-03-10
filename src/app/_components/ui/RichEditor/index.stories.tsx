import type { Meta, StoryObj } from "@storybook/react";

import { RichEditor } from ".";

const meta: Meta<typeof RichEditor> = {
	component: RichEditor,
};
export default meta;
type Story = StoryObj<typeof RichEditor>;

export const Default: Story = { args: { children: "Hello, World!" } };

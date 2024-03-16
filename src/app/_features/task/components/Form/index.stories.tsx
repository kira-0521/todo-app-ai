import type { Meta, StoryObj } from "@storybook/react";
import { Form } from ".";

const meta: Meta<typeof Form> = {
	component: Form,
};
export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = { args: { children: "Hello, World!" } };

import type { Meta, StoryObj } from "@storybook/react";
import { Dropzone } from ".";

const meta: Meta<typeof Dropzone> = {
	component: Dropzone,
};
export default meta;
type Story = StoryObj<typeof Dropzone>;

export const Default: Story = {};

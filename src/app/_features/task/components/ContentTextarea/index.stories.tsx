import type { Meta, StoryObj } from "@storybook/react";

import { ContentTextarea } from ".";

const meta: Meta<typeof ContentTextarea> = {
	component: ContentTextarea,
};
export default meta;
type Story = StoryObj<typeof ContentTextarea>;

export const Default: Story = {};

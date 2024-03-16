import type { Meta, StoryObj } from "@storybook/react";
import { TaskList } from ".";

const meta: Meta<typeof TaskList> = {
	component: TaskList,
};
export default meta;
type Story = StoryObj<typeof TaskList>;

export const Default: Story = {};

import { TextInput } from "@mantine/core";
import { memo } from "react";

import type { ComponentPropsWithoutRef, FC } from "react";

type Props = {
	inputProps?: ComponentPropsWithoutRef<typeof TextInput>;
};

export const TitleInput: FC<Props> = memo(({ inputProps = {} }) => {
	return (
		<TextInput
			id="title"
			name="title"
			size="md"
			type="text"
			label="Title"
			placeholder="Task Title"
			withAsterisk
			description="Input your task title here."
			{...inputProps}
		/>
	);
});

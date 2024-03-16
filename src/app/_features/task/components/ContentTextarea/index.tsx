import { Textarea } from "@mantine/core";
import { memo } from "react";

import type { ComponentPropsWithoutRef, FC } from "react";

type Props = {
	textareaProps?: ComponentPropsWithoutRef<typeof Textarea>;
};

export const ContentTextarea: FC<Props> = memo(({ textareaProps = {} }) => {
	return (
		<Textarea
			id="content"
			name="content"
			size="md"
			label="Content"
			placeholder="Task Content"
			description="Input your task process, description, or anything else here."
			{...textareaProps}
		/>
	);
});

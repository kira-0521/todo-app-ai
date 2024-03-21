"use client";

import { memo } from "react";
import classes from "./index.module.css";

import { UnstyledButton } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { FC } from "react";
import { useDeleteTaskAction } from "../../hooks";

type Props = {
	id: string | number;
};

export const DeleteButtonAction: FC<Props> = memo(({ id }) => {
	const { dispatchDeleteTaskAction } = useDeleteTaskAction();
	return (
		<form action={dispatchDeleteTaskAction} className={classes.deleteButton}>
			<input type="hidden" name="id" value={id} />
			<UnstyledButton type="submit" className={classes.deleteButton}>
				<IconTrash className={classes.icon} />
			</UnstyledButton>
		</form>
	);
});

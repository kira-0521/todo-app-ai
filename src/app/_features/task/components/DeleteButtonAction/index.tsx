"use client";

import { memo, useTransition } from "react";
import classes from "./index.module.css";

import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { FC } from "react";
import { toFormDataForDeleteTask } from "~/server/actions";
import { useDeleteTaskAction } from "../../hooks";

type Id = string;
type Props = {
	id: Id;
	callback?: (id: Id) => void;
};

export const DeleteButtonAction: FC<Props> = memo(
	({ id, callback = () => {} }) => {
		const { dispatchDeleteTaskAction } = useDeleteTaskAction();
		const [, startTransition] = useTransition();

		return (
			<ActionIcon
				variant="subtle"
				color="gray"
				className={classes.deleteButton}
				onClick={() => {
					startTransition(() => {
						callback?.(id);
						dispatchDeleteTaskAction(
							toFormDataForDeleteTask({ id: Number.parseInt(id, 10) }),
						);
					});
				}}
			>
				<IconTrash className={classes.icon} />
			</ActionIcon>
		);
	},
);

"use client";

import { Drawer, UnstyledButton, rem } from "@mantine/core";
import { notFound, useRouter } from "next/navigation";
import { Suspense, memo, useEffect } from "react";
import classes from "./index.module.css";

import { notifications } from "@mantine/notifications";
import { IconTrash } from "@tabler/icons-react";
import type { FC } from "react";
import { useFormState } from "react-dom";
import { deleteTaskAction } from "~/server/actions";
import { Detail } from "..";
import { DetailSkeleton } from "../Detail/skelton";

type Props = {
	id: string;
};

export const DetailDrawer: FC<Props> = memo(({ id }) => {
	const [state, dispatchAction] = useFormState(deleteTaskAction, {
		message: "",
	});
	const router = useRouter();
	const parsedId = Number.parseInt(id, 10);
	if (!parsedId || typeof parsedId !== "number") {
		notFound();
	}

	useEffect(() => {
		if (state.message) {
			notifications.show({
				color: "danger",
				title: "Delete Task",
				message: state.message,
			});
		}
	}, [state]);

	return (
		<Drawer
			opened
			onClose={() => router.push("/")}
			position="right"
			size="xl"
			withCloseButton={false}
		>
			<Drawer.Header className={classes.header}>
				<Drawer.CloseButton className={classes.closeButton} />
				<form action={dispatchAction} className={classes.deleteButton}>
					<input type="hidden" name="id" value={id} />
					<UnstyledButton type="submit" className={classes.deleteButton}>
						<IconTrash
							color="red"
							style={{ width: rem(20), height: rem(20) }}
						/>
					</UnstyledButton>
				</form>
			</Drawer.Header>
			<Suspense fallback={<DetailSkeleton />}>
				<Detail id={parsedId} />
			</Suspense>
		</Drawer>
	);
});

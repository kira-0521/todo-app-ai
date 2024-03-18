"use client";

import { Drawer, Menu as MantineMenu, rem } from "@mantine/core";
import { notFound, useRouter } from "next/navigation";
import { Suspense, memo } from "react";
import classes from "./index.module.css";

import { IconTrash } from "@tabler/icons-react";
import type { FC } from "react";
import { Menu } from "~/app/_components";
import { Detail } from "..";
import { DetailSkeleton } from "../Detail/skelton";

type Props = {
	id: string;
};

export const DetailDrawer: FC<Props> = memo(({ id }) => {
	const router = useRouter();
	const parsedId = Number.parseInt(id, 10);
	if (!parsedId || typeof parsedId !== "number") {
		notFound();
	}

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
				<Menu>
					<MantineMenu.Label>Danger zone</MantineMenu.Label>
					<MantineMenu.Item
						color="danger"
						leftSection={
							<IconTrash style={{ width: rem(14), height: rem(14) }} />
						}
					>
						Delete
					</MantineMenu.Item>
				</Menu>
			</Drawer.Header>
			<Suspense fallback={<DetailSkeleton />}>
				<Detail id={parsedId} />
			</Suspense>
		</Drawer>
	);
});

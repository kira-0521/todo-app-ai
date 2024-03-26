"use client";

import { useRouter } from "next/navigation";
import { Suspense, memo } from "react";
import classes from "./index.module.css";

import { Drawer } from "@mantine/core";
import type { FC } from "react";
import { Detail } from "..";
import { DeleteButtonAction } from "../DeleteButtonAction";
import { DetailSkeleton } from "../Detail/skelton";

type Props = {
	id: string;
};

export const DetailDrawer: FC<Props> = memo(({ id }) => {
	const router = useRouter();
	const parsedId = Number.parseInt(id, 10);

	return (
		<Drawer
			opened={!!parsedId}
			onClose={() => router.push("/task")}
			position="right"
			size="xl"
			withCloseButton={false}
			withOverlay={false}
			removeScrollProps={{
				enabled: false,
			}}
			transitionProps={{
				transition: "fade",
				duration: 300,
				timingFunction: "linear",
			}}
		>
			<Drawer.Header className={classes.header}>
				<Drawer.CloseButton className={classes.closeButton} />
				<DeleteButtonAction id={id} />
			</Drawer.Header>
			<Suspense fallback={<DetailSkeleton />}>
				<Detail id={parsedId} />
			</Suspense>
		</Drawer>
	);
});

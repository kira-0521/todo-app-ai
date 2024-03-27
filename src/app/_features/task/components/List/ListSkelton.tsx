import { Box, Skeleton, Stack } from "@mantine/core";
import type { FC } from "react";
import classes from "./index.module.css";

export const TaskListSkeleton: FC = () => {
	const list = [1, 2, 3];
	return (
		<Box className={classes.board}>
			{list.map((l) => (
				<Stack key={l} className={classes.panel} gap="md" pt={20}>
					<Skeleton p={30} h={67} />
					<Stack gap="xs">
						{[1, 2, 3, 4, 5, 6, 7].map((n) => (
							<Skeleton key={n} className={classes.card} h={100} />
						))}
					</Stack>
				</Stack>
			))}
		</Box>
	);
};

import { SimpleGrid, Skeleton, Stack } from "@mantine/core";
import { type FC, memo } from "react";
import classes from "./index.module.css";

export const DashBoardSkelton: FC = memo(() => {
	return (
		<SimpleGrid cols={3} className={classes.board}>
			<Stack className={classes.panel} pt={20}>
				<Skeleton p={30} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
			</Stack>
			<Stack className={classes.panel} pt={20}>
				<Skeleton p={30} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
			</Stack>
			<Stack className={classes.panel} pt={20}>
				<Skeleton p={30} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
				<Skeleton className={classes.card} />
			</Stack>
		</SimpleGrid>
	);
});

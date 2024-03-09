"use client";

import {
	Avatar,
	Container,
	Flex,
	Tooltip,
	UnstyledButton,
	useMantineTheme,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { memo } from "react";
import classes from "./index.module.css";

import type { FC } from "react";
import { COLOR_VALIANTS_MAP } from "~/constants";

type Props = {
	avatar: string;
	username: string;
};

export const Header: FC<Props> = memo(({ avatar, username }) => {
	const theme = useMantineTheme();

	return (
		<Container component="header">
			<Flex
				justify="flex-end"
				align="center"
				gap={12}
				className={classes.inner}
			>
				<Tooltip label={username} position="bottom" offset={5} withArrow>
					<Avatar src={avatar} alt={username} radius="xl" size={28} />
				</Tooltip>
				<UnstyledButton className={classes.logout}>
					<IconLogout
						color={theme.colors.danger?.[COLOR_VALIANTS_MAP.main] || "black"}
					/>
				</UnstyledButton>
			</Flex>
		</Container>
	);
});

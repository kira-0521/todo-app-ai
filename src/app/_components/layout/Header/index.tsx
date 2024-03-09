"use client";

import {
	Anchor,
	Avatar,
	Container,
	Flex,
	Tooltip,
	useMantineTheme,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import { memo } from "react";
import classes from "./index.module.css";

import type { FC } from "react";
import { COLOR_VALIANTS_MAP } from "~/constants";

type Props = {
	avatar?: string;
	username: string;
};

export const Header: FC<Props> = memo(({ avatar, username }) => {
	const theme = useMantineTheme();

	return (
		<Container component="header" className={classes.header} fluid>
			<Flex
				justify="flex-end"
				align="center"
				gap={12}
				className={classes.inner}
			>
				<Tooltip label={username} position="bottom" offset={5} withArrow>
					<Avatar src={avatar} alt={username} radius="xl" size={28} />
				</Tooltip>
				<Tooltip label="to Signout Page" position="bottom" offset={5} withArrow>
					<Anchor
						component={Link}
						href="/api/auth/signout"
						className={classes.logout}
					>
						<IconLogout
							color={theme.colors.danger?.[COLOR_VALIANTS_MAP.main] || "black"}
						/>
					</Anchor>
				</Tooltip>
			</Flex>
		</Container>
	);
});

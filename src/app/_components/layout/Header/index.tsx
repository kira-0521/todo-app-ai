"use client";

import { Avatar, Container, Flex, rem } from "@mantine/core";
import { Menu as MantineMenu } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import { memo } from "react";
import classes from "./index.module.css";

import type { FC } from "react";

import { Menu } from "../..";

type Props = {
	avatar?: string;
	username: string;
};

export const Header: FC<Props> = memo(({ avatar, username }) => {
	return (
		<Container component="header" className={classes.header} fluid>
			<Flex
				justify="flex-end"
				align="center"
				gap={12}
				className={classes.inner}
			>
				<Menu
					target={<Avatar src={avatar} alt={username} radius="xl" size={28} />}
				>
					<MantineMenu.Label>Application</MantineMenu.Label>
					<MantineMenu.Item
						c="danger"
						leftSection={
							<IconLogout style={{ width: rem(14), height: rem(14) }} />
						}
						component={Link}
						href="/api/auth/signout"
					>
						SignOut
					</MantineMenu.Item>
				</Menu>
			</Flex>
		</Container>
	);
});

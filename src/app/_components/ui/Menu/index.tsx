"use client";

import { Menu as MantineMenu, UnstyledButton } from "@mantine/core";

import type { FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
	target: ReactNode;
};

export const Menu: FC<Props> = ({ children, target }) => {
	return (
		<MantineMenu shadow="md" width={200} withArrow>
			<MantineMenu.Target>
				<UnstyledButton
					style={{
						display: "inline-flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{target}
				</UnstyledButton>
			</MantineMenu.Target>

			<MantineMenu.Dropdown>{children}</MantineMenu.Dropdown>
		</MantineMenu>
	);
};

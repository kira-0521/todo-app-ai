"use client";

import { Menu as MantineMenu, UnstyledButton } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";

import type { FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const Menu: FC<Props> = ({ children }) => {
	return (
		<MantineMenu shadow="md" width={200}>
			<MantineMenu.Target>
				<UnstyledButton
					style={{
						display: "inline-flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<IconDots stroke={2} />
				</UnstyledButton>
			</MantineMenu.Target>

			<MantineMenu.Dropdown>{children}</MantineMenu.Dropdown>
		</MantineMenu>
	);
};

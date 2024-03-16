"use client";

import { Affix, Button } from "@mantine/core";
import Link from "next/link";
import type { FC } from "react";

export const AddButtonFixed: FC = () => {
	return (
		<Affix position={{ bottom: 20, right: 20 }}>
			<Button component={Link} href="/add" radius="xl">
				+ New
			</Button>
		</Affix>
	);
};

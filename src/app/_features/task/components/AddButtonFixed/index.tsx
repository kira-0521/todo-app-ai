"use client";

import { Affix, Button } from "@mantine/core";
import Link from "next/link";
import type { FC } from "react";
import type { CreateType } from "../..";

export const AddButtonFixed: FC = () => {
	const defaultType: CreateType = "manual";
	return (
		<Affix position={{ bottom: 20, right: 20 }}>
			<Button component={Link} href={`/create?type=${defaultType}`} radius="xl">
				+ New
			</Button>
		</Affix>
	);
};

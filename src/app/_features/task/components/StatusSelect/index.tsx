"use client";

import { Select } from "@mantine/core";
import type { Status } from "@prisma/client";
import { memo } from "react";

import type { ComponentPropsWithoutRef, FC } from "react";

type Props = {
	allStatus: Status[];
	selectProps?: ComponentPropsWithoutRef<typeof Select>;
};

export const StatusSelect: FC<Props> = memo(
	({ allStatus, selectProps = {} }) => {
		return (
			<Select
				label="Status"
				id="statusId"
				name="statusId"
				placeholder="Pick status"
				description="Pick your task status here."
				size="md"
				withAsterisk
				withCheckIcon
				data={allStatus.map((status) => ({
					value: status.id.toString(),
					label: status.title,
				}))}
				searchable
				{...selectProps}
			/>
		);
	},
);

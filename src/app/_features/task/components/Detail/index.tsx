import { Badge, Container, Divider, Stack, Text, Title } from "@mantine/core";
import { memo } from "react";

import type { FC } from "react";
import {
	STATUS_COLOR_MAP,
	statusGuard,
} from "~/app/_features/status/@types/status";
import { api } from "~/trpc/react";

type Props = {
	id: number;
};

export const Detail: FC<Props> = memo(({ id }) => {
	const { data: taskDetail } = api.task.getDetail.useQuery(
		{ id },
		{
			enabled: !!id,
		},
	);

	if (!taskDetail) return null;

	const { title, status, content } = taskDetail;

	return (
		<Container>
			<Stack>
				<Title>{title}</Title>
				<Badge color={statusGuard(status) ? STATUS_COLOR_MAP[status] : "gray"}>
					{status}
				</Badge>
			</Stack>
			<Divider size="md" my="sm" />
			<Text>{content}</Text>
		</Container>
	);
});

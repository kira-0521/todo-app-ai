import { Container } from "@mantine/core";
import { Suspense } from "react";
import { DashBoardSkelton } from "~/app/_components/skelton";
import { DetailDrawer } from "~/app/_features";
import { Dashboard } from "./_components";

export default function TaskDetailPage({
	searchParams: { id = undefined },
}: {
	searchParams: {
		id?: string;
	};
}) {
	const taskId = id ?? "";
	return (
		<Container>
			<Suspense fallback={<DashBoardSkelton />}>
				<Dashboard taskId={taskId} />
			</Suspense>
			<DetailDrawer id={taskId} />
		</Container>
	);
}

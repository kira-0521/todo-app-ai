import { Container } from "@mantine/core";
import { Suspense } from "react";
import { DashBoardSkelton } from "~/app/_components/skelton";
import { DetailDrawer } from "~/app/_features";
import { Dashboard } from "../_components";

export default function TaskDetailPage({
	params,
}: {
	params: {
		id: string;
	};
}) {
	return (
		<Container>
			<Suspense fallback={<DashBoardSkelton />}>
				<Dashboard isOpenModal={false} />
			</Suspense>
			<DetailDrawer id={params.id} />
		</Container>
	);
}

import { Container } from "@mantine/core";

import { Suspense } from "react";
import { DashBoardSkelton } from "../_components/skelton";

import { Dashboard } from "../dashboard";

export default function AddTaskPage() {
	return (
		<main>
			<Container>
				<Suspense fallback={<DashBoardSkelton />}>
					<Dashboard isOpenModal />
				</Suspense>
			</Container>
		</main>
	);
}

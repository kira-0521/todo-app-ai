import { Container } from "@mantine/core";

import { Suspense } from "react";
import { DashBoardSkelton } from "../../_components/skelton";

import { Dashboard } from "../_components";

export default function CreateTaskPage() {
	return (
		<main>
			<Container>
				<Suspense fallback={<DashBoardSkelton />}>
					<Dashboard isOpenModal createType="manual" />
				</Suspense>
			</Container>
		</main>
	);
}

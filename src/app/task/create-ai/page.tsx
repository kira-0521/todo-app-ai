import { Container } from "@mantine/core";

import { Suspense } from "react";
import { DashBoardSkelton } from "../../_components/skelton";

import { Dashboard } from "../_components";

export default function CreateTaskFromAIPage() {
	return (
		<main>
			<Container>
				<Suspense fallback={<DashBoardSkelton />}>
					<Dashboard isOpenModal createType="ai" />
				</Suspense>
			</Container>
		</main>
	);
}

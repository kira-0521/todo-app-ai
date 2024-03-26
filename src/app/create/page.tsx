import { Container } from "@mantine/core";

import { Suspense } from "react";
import { DashBoardSkelton } from "../_components/skelton";

import type { CreateType } from "../_features/task/@types";
import { Dashboard } from "../task/_components";

export default function CreateTaskPage({
	searchParams,
}: {
	searchParams: {
		type: CreateType;
	};
}) {
	return (
		<main>
			<Container>
				<Suspense fallback={<DashBoardSkelton />}>
					<Dashboard isOpenModal createType={searchParams.type || "manual"} />
				</Suspense>
			</Container>
		</main>
	);
}

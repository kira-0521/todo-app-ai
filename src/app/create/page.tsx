import { Container } from "@mantine/core";

import { Suspense } from "react";
import { DashBoardSkelton } from "../_components/skelton";

import { CreateModal } from "../_features";
import type { CreateType } from "../_features/task/@types";
import { Dashboard } from "../task/_components";

export default function CreateTaskPage({
	searchParams: { type = "manual" },
}: {
	searchParams: {
		type: CreateType;
	};
}) {
	return (
		<>
			<Container>
				<Suspense fallback={<DashBoardSkelton />}>
					<Dashboard />
				</Suspense>
			</Container>
			<CreateModal
				createType={type}
				isOpen={type === "manual" || type === "ai"}
			/>
		</>
	);
}

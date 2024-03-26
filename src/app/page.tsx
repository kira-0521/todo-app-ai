import { Container } from "@mantine/core";

import { Suspense } from "react";

import { DashBoardSkelton } from "./_components/skelton";
import { Dashboard } from "./task/_components";

export default function Home() {
	return (
		<Container>
			<Suspense fallback={<DashBoardSkelton />}>
				<Dashboard />
			</Suspense>
		</Container>
	);
}

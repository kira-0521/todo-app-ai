import { Container } from "@mantine/core";

import { Suspense } from "react";

import { DashBoardSkelton } from "./_components/skelton";
import { Dashboard } from "./task/_components/Dashboard";

export default function Home() {
	return (
		<main>
			<Container>
				<Suspense fallback={<DashBoardSkelton />}>
					<Dashboard isOpenModal={false} />
				</Suspense>
			</Container>
		</main>
	);
}

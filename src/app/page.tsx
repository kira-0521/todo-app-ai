import { Container } from "@mantine/core";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import { Suspense } from "react";
import { CreateStatus } from "./_components/create-status";
import { CreateTask } from "./_components/create-task";
import {
	TaskList,
	TaskListSkeleton,
} from "./_features/task/components/task-list";

export default function Home() {
	return (
		<main>
			<Container>
				<Suspense fallback={<TaskListSkeleton />}>
					<TaskList />
				</Suspense>
				<CrudShowcase />
			</Container>
		</main>
	);
}

async function CrudShowcase() {
	const session = await getServerAuthSession();
	if (!session?.user) return null;

	const latestPost = await api.task.getLatest.query();

	return (
		<div>
			{latestPost ? (
				<p>Your most recent post: {latestPost.title}</p>
			) : (
				<p>You have no posts yet.</p>
			)}

			<CreateStatus />
			<CreateTask />
		</div>
	);
}

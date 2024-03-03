import { Anchor, Container, Stack, Text } from "@mantine/core";
import { unstable_noStore as noStore } from "next/cache";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import Link from "next/link";
import { CreateStatus } from "./_components/create-status";
import { CreateTask } from "./_components/create-task";

export default async function Home() {
	noStore();
	const session = await getServerAuthSession();

	return (
		<main>
			<Container>
				<Stack>
					<Container>
						<Text>
							{session && <span>Logged in as {session.user?.name}</span>}
						</Text>
						<Anchor
							component={Link}
							variant="gradient"
							href={session ? "/api/auth/signout" : "/api/auth/signin"}
						>
							{session ? "Sign out" : "Sign in"}
						</Anchor>
					</Container>
				</Stack>
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

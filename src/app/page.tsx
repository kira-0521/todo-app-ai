import { Anchor, Container, Stack, Text, Title } from "@mantine/core";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
	noStore();
	const hello = await api.post.hello.query({ text: "from tRPC" });
	const session = await getServerAuthSession();

	return (
		<main>
			<Container>
				<Stack>
					<Title order={1}>
						{hello ? hello.greeting : "Loading tRPC query..."}
					</Title>

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

	const latestPost = await api.post.getLatest.query();

	return (
		<div>
			{latestPost ? (
				<p>Your most recent post: {latestPost.name}</p>
			) : (
				<p>You have no posts yet.</p>
			)}

			<CreatePost />
		</div>
	);
}

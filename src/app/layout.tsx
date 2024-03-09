import "@mantine/core/styles.css";
import { unstable_noStore as noStore } from "next/cache";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { getServerAuthSession } from "~/server/auth";
import { theme } from "~/theme";
import { TRPCReactProvider } from "~/trpc/react";
import { Header } from "./_components/";

const inter = Inter({
	subsets: ["latin"],
});

export const metadata = {
	title: "TodoAppAI",
	description: "Generated by create-t3-app, Auth0, Vercel, PlanetScale",
	icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default async function RootLayout({
	children,
}: {
	children: ReactNode;
}) {
	noStore();
	const session = await getServerAuthSession();

	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
			</head>
			<body className={inter.className}>
				<TRPCReactProvider>
					<MantineProvider theme={theme}>
						<Header
							avatar={session?.user.image ?? undefined}
							username={session?.user.name ?? ""}
						/>
						<main>{children}</main>
					</MantineProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}

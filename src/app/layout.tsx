import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { unstable_noStore as noStore } from "next/cache";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import cx from "clsx";
import { theme } from "~/app/_css/theme";
import { getServerAuthSession } from "~/server/auth";
import { TRPCReactProvider } from "~/trpc/react";
import { Header } from "./_components/";
import { AddButtonFixed } from "./_features";
import classes from "./layout.module.css";

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
			<body className={cx(inter.className, classes.body)}>
				<TRPCReactProvider>
					<MantineProvider theme={theme} defaultColorScheme="dark">
						<Notifications position="top-right" />
						<Header
							avatar={session?.user.image ?? undefined}
							username={session?.user.name ?? ""}
						/>
						<main>{children}</main>
						<AddButtonFixed />
					</MantineProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}

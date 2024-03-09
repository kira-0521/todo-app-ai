import { MantineProvider, useMantineColorScheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { addons } from "@storybook/preview-api";
import type { Preview } from "@storybook/react";

import React from "react";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { theme } from "../src/theme";

const channel = addons.getChannel();

function ColorSchemeWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const { setColorScheme } = useMantineColorScheme();
	const handleColorScheme = (value: boolean) =>
		setColorScheme(value ? "dark" : "light");

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		channel.on(DARK_MODE_EVENT_NAME, handleColorScheme);
		return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme);
	}, [channel]);

	return <>{children}</>;
}

const decorators = [
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	(renderStory: any) => (
		<ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>
	),
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	(renderStory: any) => (
		<MantineProvider theme={theme}>{renderStory()}</MantineProvider>
	),
];

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators,
};

export default preview;

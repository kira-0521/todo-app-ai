import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-onboarding",
		"@storybook/addon-interactions",
		"@storybook/addon-styling-webpack",
		"storybook-dark-mode",
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	docs: {
		autodocs: "tag",
	},
	webpack(baseConfig) {
		baseConfig.resolve = {
			...(baseConfig.resolve ?? {}),
			alias: {
				...(baseConfig.resolve?.alias ?? {}),
				"@opentelemetry/api": "next/dist/compiled/@opentelemetry/api",
			},
		};
		return baseConfig;
	},
};
export default config;

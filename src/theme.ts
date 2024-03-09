import { createTheme } from "@mantine/core";
import classes from "./css/active.module.css";

export const theme = createTheme({
	autoContrast: true,
	primaryColor: "blue",
	activeClassName: classes.active,
	cursorType: "pointer",
	defaultGradient: {
		from: "blue",
		to: "purple",
		deg: 45,
	},
	colors: {
		secondary: [
			"#fff4e2",
			"#ffe9cc",
			"#ffd09c",
			"#fdb766",
			"#fca13a",
			"#fb931d",
			"#fc8c0c",
			"#e17900",
			"#c86a00",
			"#ae5a00",
		],
		danger: [
			"#ffeaec",
			"#fdd4d6",
			"#f4a7ac",
			"#ec777e",
			"#e64f57",
			"#e3353f",
			"#e22732",
			"#c91a25",
			"#b31220",
			"#9e0419",
		],
	},
});

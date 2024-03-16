import { Button, Loader, LoadingOverlay, Stack } from "@mantine/core";
import { memo } from "react";

import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";

type Props = {
	children: ReactNode;
	form: ComponentPropsWithoutRef<"form">;
	isLoadingOverlay?: boolean;
};

export const Form: FC<Props> = memo(({ children, form, isLoadingOverlay }) => {
	return (
		<form {...form}>
			<Stack pos="relative">
				<LoadingOverlay
					visible={isLoadingOverlay ?? false}
					loaderProps={{ children: <Loader color="gray" /> }}
				/>
				{children}
				<Button type="submit">Submit</Button>
			</Stack>
		</form>
	);
});

"use client";

import { Button, Loader, LoadingOverlay, Stack } from "@mantine/core";
import { memo } from "react";

import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type Props = {
	children: ReactNode;
	form: ComponentPropsWithoutRef<"form">;
	isLoadingOverlay?: boolean;
};

const SubmitButton = () => {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" disabled={pending} loading={pending}>
			Submit
		</Button>
	);
};

export const Form: FC<Props> = memo(({ children, form, isLoadingOverlay }) => {
	return (
		<form {...form}>
			<Stack pos="relative">
				<LoadingOverlay
					visible={isLoadingOverlay ?? false}
					loaderProps={{ children: <Loader /> }}
				/>
				{children}
				<SubmitButton />
			</Stack>
		</form>
	);
});

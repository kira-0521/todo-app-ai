"use client";

import { Button, Loader, LoadingOverlay, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { memo, useEffect } from "react";

import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { useFormStatus } from "react-dom";

type Props = {
	children: ReactNode;
	form: ComponentPropsWithoutRef<"form">;
	isLoadingOverlay?: boolean;
	isAi?: boolean;
};

const SubmitButton = ({ isAi = false }: { isAi?: boolean }) => {
	const { pending } = useFormStatus();

	useEffect(() => {
		if (pending && isAi) {
			notifications.show({
				message: "AI is creating tasks...",
				loading: pending,
				color: "secondary",
			});
		}
	}, [pending, isAi]);

	return (
		<Button type="submit" disabled={pending} loading={pending}>
			Submit
		</Button>
	);
};

export const Form: FC<Props> = memo(
	({ children, form, isLoadingOverlay = false, isAi = false }) => {
		return (
			<form {...form}>
				<Stack pos="relative">
					<LoadingOverlay
						visible={isLoadingOverlay ?? false}
						loaderProps={{ children: <Loader /> }}
					/>
					{children}
					<SubmitButton isAi={isAi} />
				</Stack>
			</form>
		);
	},
);

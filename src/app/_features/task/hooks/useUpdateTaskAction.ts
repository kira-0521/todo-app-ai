import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { updateTaskAction } from "~/server/actions";

export const useUpdateTaskAction = () => {
	const [state, formAction] = useFormState(updateTaskAction, {
		status: "success" as const,
		message: "",
	});

	useEffect(() => {
		if (state.status === "error" && state.message) {
			notifications.show({
				color: "danger",
				title: "Failed",
				message: state.message,
			});
		}
	}, [state]);

	return {
		state,
		formAction,
	};
};

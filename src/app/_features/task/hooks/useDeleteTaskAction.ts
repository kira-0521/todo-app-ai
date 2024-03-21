import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { deleteTaskAction } from "~/server/actions";

export const useDeleteTaskAction = () => {
	const [state, dispatchAction] = useFormState(deleteTaskAction, {
		message: "",
	});

	useEffect(() => {
		if (state.message) {
			notifications.show({
				color: "danger",
				title: "Failed",
				message: state.message,
			});
		}
	}, [state]);

	return {
		dispatchDeleteTaskAction: dispatchAction,
	};
};

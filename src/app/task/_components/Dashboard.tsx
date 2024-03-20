import type { FC } from "react";
import { api } from "~/trpc/server";
import { CreateModal, TaskList } from "../../_features";

type Props =
	| { isOpenModal: true; createType: "manual" | "ai" }
	| {
			isOpenModal: false;
			createType?: never;
	  };

export const Dashboard: FC<Props> = async ({ isOpenModal, createType }) => {
	const statuses = await api.status.getAll.query();
	const tasks = await api.task.getAll.query();

	return (
		<>
			<TaskList taskList={tasks} statusList={statuses} />
			<CreateModal isOpen={isOpenModal} createType={createType ?? "manual"} />
		</>
	);
};

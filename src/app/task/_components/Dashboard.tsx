import { unstable_noStore as noStore } from "next/cache";
import type { FC } from "react";
import { api } from "~/trpc/server";
import { CreateModal, type CreateType, TaskList } from "../../_features";

type Props =
	| { isOpenModal: true; createType: CreateType }
	| {
			isOpenModal: false;
			createType?: never;
	  };

export const Dashboard: FC<Props> = async ({ isOpenModal, createType }) => {
	// INFO: Blocked：Dynamic server usage: Page couldn't be rendered statically because it used `headers`.
	noStore();
	const tasks = await api.task.getAll.query();
	const statuses = await api.status.getAll.query();

	return (
		<>
			<TaskList taskList={tasks} statusList={statuses} />
			<CreateModal isOpen={isOpenModal} createType={createType ?? "manual"} />
		</>
	);
};

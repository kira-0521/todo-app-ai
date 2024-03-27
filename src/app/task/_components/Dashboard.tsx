import { unstable_noStore as noStore } from "next/cache";
import type { FC } from "react";
import { api } from "~/trpc/server";
import { TaskList } from "../../_features";

type Props = {
	taskId?: string;
};

export const Dashboard: FC<Props> = async ({ taskId = "" }) => {
	// INFO: Blocked：Dynamic server usage: Page couldn't be rendered statically because it used `headers`.
	noStore();
	const tasks = await api.task.getAll.query();
	const statuses = await api.status.getAll.query();

	return (
		<TaskList taskList={tasks} statusList={statuses} hasScroll={!!taskId} />
	);
};

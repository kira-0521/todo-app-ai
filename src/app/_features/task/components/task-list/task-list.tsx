import { api } from "~/trpc/server";
import { DnDList } from "..";

export const TaskList = async () => {
	const data = await api.task.getAll.query({ statusId: 1 });
	return <DnDList taskList={data} />;
};

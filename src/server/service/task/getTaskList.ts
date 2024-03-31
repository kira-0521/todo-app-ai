import type { TaskDetail, TaskList } from "~/@types/task";
import type {
	StatusRepository,
	TaskRepository,
	UserRepository,
} from "~/server/repository";

export const getTaskList = async (
	repository: TaskRepository,
	statusRepository: StatusRepository,
	userRepository: UserRepository,
): Promise<TaskList> => {
	const tasks = await repository.findAll();
	const statuses = await statusRepository.findAll();
	const users = await userRepository.findAll();

	const taskList = tasks.map<TaskDetail>((task) => {
		const status = statuses.find((status) => status.id === task.statusId);
		const user = users.find((user) => user.id === task.createdById);

		return {
			id: task.id,
			title: task.title,
			content: task.content ?? "",
			status: status?.title ?? "",
			statusId: status?.id ?? 0,
			createdBy: user?.id ?? "",
			username: user?.name ?? "",
			userIconUrl: user?.image ?? "",
			createdAt: task.createdAt.toISOString(),
			updateAt: task.updatedAt ? task.updatedAt.toISOString() : "",
		};
	});

	return taskList.sort((a, b) => {
		if (a.createdAt < b.createdAt) return 1;
		if (a.createdAt > b.createdAt) return -1;
		return 0;
	});
};

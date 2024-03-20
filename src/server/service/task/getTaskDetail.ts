import type { TaskDetail } from "~/@types/task";
import type {
	StatusRepository,
	TaskRepository,
	UserRepository,
} from "~/server/repository";

export const getTaskDetail = async (
	repository: TaskRepository,
	statusRepository: StatusRepository,
	userRepository: UserRepository,
	id: number,
): Promise<TaskDetail> => {
	const task = await repository.findById(id);

	if (!task) throw new Error("Task not found");

	const status = await statusRepository.findById(task.statusId);
	if (!status) throw new Error("Status not found");

	const user = await userRepository.findById(task.createdById);
	if (!user) throw new Error("User not found");

	return {
		id: task.id,
		title: task.title,
		content: task.content ?? "",
		status: status.title,
		statusId: status.id,
		createdBy: user.name ?? "",
		username: user.name ?? "",
		userIconUrl: user.image ?? "",
		createdAt: task.createdAt.toISOString(),
		updateAt: task.updatedAt ? task.updatedAt.toISOString() : "",
	};
};

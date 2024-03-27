import type { TaskDetail } from "~/@types/task";
import type { UpdateTaskSchema } from "~/server/actions";
import type {
	StatusRepository,
	TaskRepository,
	UserRepository,
} from "~/server/repository";

export const updateTask = async (
	repository: TaskRepository,
	statusRepository: StatusRepository,
	userRepository: UserRepository,
	args: UpdateTaskSchema,
): Promise<TaskDetail> => {
	const updatedTask = await repository.update({
		where: { id: args.id },
		data: args,
	});

	const status = await statusRepository.findById(updatedTask.statusId);
	const user = await userRepository.findById(updatedTask.createdById);
	if (!status) throw new Error("Status not found");
	if (!user) throw new Error("User not found");

	return {
		id: updatedTask.id,
		title: updatedTask.title,
		content: updatedTask.content ?? "",
		status: status.title,
		statusId: status.id,
		createdBy: user.name ?? "",
		username: user.name ?? "",
		userIconUrl: user.image ?? "",
		createdAt: updatedTask.createdAt.toISOString(),
		updateAt: updatedTask.updatedAt ? updatedTask.updatedAt.toISOString() : "",
	};
};

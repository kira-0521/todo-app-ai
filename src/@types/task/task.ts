export type TaskDetail = {
	id: number;
	title: string;
	content: string;
	status: string;
	statusId: number;
	createdBy: string;
	username: string;
	userIconUrl: string;
	createdAt: string;
	updateAt: string;
};

export type TaskList = TaskDetail[];

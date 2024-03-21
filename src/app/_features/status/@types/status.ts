export const STATUSES = ["ToDo", "InProgress", "Done"] as const;
export type Status = (typeof STATUSES)[number];
export const STATUS_COLOR_MAP = {
	ToDo: "green",
	InProgress: "blue",
	Done: "purple",
} as const satisfies Record<Status, string>;

export const statusGuard = (status: string): status is Status => {
	return STATUSES.some((s) => s === status);
};

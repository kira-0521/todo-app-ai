export const isWithinLastFiveMinutes = (iso8601String: string): boolean => {
	const date = new Date(iso8601String);
	const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
	return date >= fiveMinutesAgo;
};

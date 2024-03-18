import { Skeleton } from "@mantine/core";

export const DetailSkeleton = () => {
	return (
		<div>
			<Skeleton height={30} width={200} mb="md" />
			<Skeleton height={20} width={100} mb="md" />
			<Skeleton height={8} mt="sm" radius="xl" />
			<Skeleton height={8} mt="sm" radius="xl" />
			<Skeleton height={8} mt="sm" radius="xl" />
		</div>
	);
};

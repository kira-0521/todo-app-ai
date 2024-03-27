import { Container, Divider, Skeleton, Stack } from "@mantine/core";

export const DetailSkeleton = () => {
	return (
		<Container>
			<Stack>
				<Skeleton h={88} />
				<Skeleton h={20} w={55} />
			</Stack>
			<Divider size="md" my="sm" />
			<Skeleton h={50} />
		</Container>
	);
};

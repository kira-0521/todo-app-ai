import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

try {
	console.log("🏃‍♀️ データベースにシードデータを挿入します...");

	const user1 = await prisma.user.create({
		data: {
			name: "Alice",
			email: "alice@example.com",
			statuses: {
				create: [
					{ title: "ToDo", displayOrder: 1 },
					{ title: "InProgress", displayOrder: 2 },
					{ title: "Done", displayOrder: 3 },
				],
			},
			tasks: {
				create: [
					{
						title: faker.lorem.sentence(),
						statusId: 1,
						content: faker.lorem.paragraph(),
					},
					{
						title: faker.lorem.sentence(),
						statusId: 1,
						content: faker.lorem.paragraph(),
					},
					{
						title: faker.lorem.sentence(),
						statusId: 2,
						content: faker.lorem.paragraph(),
					},
					{
						title: faker.lorem.sentence(),
						statusId: 2,
						content: faker.lorem.paragraph(),
					},
					{
						title: faker.lorem.sentence(),
						statusId: 3,
						content: faker.lorem.paragraph(),
					},
					{
						title: faker.lorem.sentence(),
						statusId: 3,
						content: faker.lorem.paragraph(),
					},
				],
			},
		},
	});

	const user2 = await prisma.user.create({
		data: {
			name: "Bob",
			email: "bob@example.com",
			tasks: {
				create: [
					{
						title: faker.lorem.sentence(),
						statusId: 1,
						content: faker.lorem.paragraph(),
					},
					{
						title: faker.lorem.sentence(),
						statusId: 1,
						content: faker.lorem.paragraph(),
					},
					{
						title: faker.lorem.sentence(),
						statusId: 2,
						content: faker.lorem.paragraph(),
					},
					{
						title: faker.lorem.sentence(),
						statusId: 2,
						content: faker.lorem.paragraph(),
					},
					{
						title: faker.lorem.sentence(),
						statusId: 3,
						content: faker.lorem.paragraph(),
					},
					{
						title: faker.lorem.sentence(),
						statusId: 3,
						content: faker.lorem.paragraph(),
					},
				],
			},
		},
	});
	console.log({ user1, user2 });
	console.log("✅ シードデータの挿入が完了しました。");
} catch (e) {
	console.error(e);
	throw e;
} finally {
	await prisma.$disconnect();
}

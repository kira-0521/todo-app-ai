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
					{ title: "カレー", statusId: 1 },
					{ title: "ラーメン", statusId: 1 },
					{ title: "カツ丼", statusId: 2 },
					{ title: "親子丼", statusId: 2 },
					{ title: "天丼", statusId: 3 },
					{ title: "牛丼", statusId: 3 },
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
					{ title: "パン", statusId: 1 },
					{ title: "サンドイッチ", statusId: 1 },
					{ title: "ハンバーガー", statusId: 2 },
					{ title: "ピザ", statusId: 2 },
					{ title: "寿司", statusId: 3 },
					{ title: "刺身", statusId: 3 },
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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * INFO: 本番環境にマスターデータが必要なときのみ実施
 */
try {
	console.log("🏃‍♀️ データベースにマスターデータを挿入します...");

	await prisma.status.createMany({
		data: [
			{
				title: "ToDo",
				displayOrder: 1,
				createdById: "",
			},
			{
				title: "InProgress",
				displayOrder: 2,
				createdById: "",
			},
			{
				title: "Done",
				displayOrder: 3,
				createdById: "",
			},
		],
	});

	console.log("✅ マスターデータの挿入が完了しました。");
} catch (e) {
	console.error(e);
	throw e;
} finally {
	await prisma.$disconnect();
}

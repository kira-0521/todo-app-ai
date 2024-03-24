help:
	@echo '--- コンテナ関連 ---'
	@echo 'ps                   -- コンテナ一覧を表示します'
	@echo 'up                   -- コンテナを起動します'
	@echo 'down                 -- コンテナを停止します'
	@echo 'build                -- コンテナをビルドします'
	@echo 'rebuild              -- コンテナを再ビルドします'
	@echo 'start                -- コンテナを開始します'
	@echo 'stop                 -- コンテナを停止します'
	@echo 'restart              -- コンテナを再起動します'
	@echo 'status               -- コンテナの状態を表示します'
	@echo 'logs                 -- コンテナのログを表示します'
	@echo 'exec                 -- コンテナに入ります'
	@echo ''

	@echo '--- DB関連 ---'
	@echo 'db                   -- DBに接続します'
	@echo 'db-push              -- DBにPrismaの変更を反映させます'
	@echo 'db-studio            -- Prisma Studioを起動します'
	@echo 'db-format            -- Prismaのフォーマットを実施します'
	@echo 'db-validate          -- Prismaのバリデーションを実施します'
	@echo 'db-seed              -- Prismaのseedを実施します'
	@echo 'db-status            -- Prismaのstatusを表示します'
	@echo 'db-fresh             -- Prismaのデータをリセットします'

	@echo '--- 開発環境関連 ---'
	@echo 'dev                  -- ローカルサーバーを起動します'
	@echo 'check                -- formatとlintを実施します'
	@echo 'type-check           -- 型チェックを実施します'
	@echo 'e-ls                 -- vercelのenv一覧を表示します'
	@echo 'e-add                -- vercelのenvを追加します'
	@echo 'e-rm                 -- vercelのenvを削除します'
	@echo 'e-pull               -- vercelのenvを取得します'
	@echo 'storybook            -- storybookを起動します'
	@echo 'scaffold              -- ファイルを生成します'

ps:
	docker-compose ps
up:
	docker-compose up -d
down:
	docker-compose down
build:
	docker-compose build
rebuild:
	docker-compose up -d --build
start:
	docker-compose start
stop:
	docker-compose stop
restart:
	docker-compose restart
status:
	docker-compose ps
logs:
	docker-compose logs -f
exec:
	docker-compose exec postgres sh

# データベース関連のコマンド
db:
	docker compose exec postgres sh
db-push:
	bun run db:push
db-studio:
	bun run db:studio
db-format:
	bunx prisma format
db-validate:
	bunx prisma validate
db-seed:
	bunx prisma db seed
db-status:
	bunx prisma migrate status
db-fresh:
	bunx prisma migrate reset

# 開発ツール関連のコマンド
dev:
	bun dev
check:
	bun run check
type-check:
	bun run type:check
storybook:
	bun run storybook
scaffold:
	bun run scaffold

# 環境変数関連のコマンド
e-ls:
	vercel env ls
e-add:
	vercel env add
e-rm:
	vercel env rm
e-pull:
	vercel env pull

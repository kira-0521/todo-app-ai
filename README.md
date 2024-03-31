# ✔最強のTODOアプリ

- UIデザインのキャプチャをもとにAIを使ったタスクの自動生成を行います

## 🚀 GetStarted

1. git clone https://github.com/kira-0521/todo-app-ai.git
2. `make init`
3. http://localhost:3000 にアクセス
4. テストユーザーログイン：`test@example.com`, `Password123!`

※ ⚠ プライベートリポジトリ開発のため`env`をgitに含めています。
※ ⚠ 複数人同時サインインが無理な可能性が高いため、突然ログアウトされる等の事象が生じた場合はテストユーザーではなくご自身のアカウントを使用するか、新しくアカウントを作成してください。アカウント作成にはメール認証等はないため、メールアドレスとパスワードのみ設定いただければ問題有りません。
※ ℹ assets配下にAI自動生成対象用のサンプル画像を用意しているのでよければお使いください。

## 🚀 本番環境

※ 本番環境でバグが確認されているため、ローカルでの確認が良いかと思います。

https://todo-app-ai-bay.vercel.app/

## 📖 目次

- [機能](#機能)
- [画面](#画面)
- [技術スタック](#技術スタック)
  - [認証](#認証)
  - [タスク管理](#タスク管理)
- [🙋 アピールポイント](#-アピールポイント)

## 機能

- 認証（サインアップ、ログイン、ログアウト）
  - Basic認証、Google認証、GitHub認証
- タスクの作成、参照、更新、削除
  - 通常作成、AI作成、一覧と詳細の参照、ステータス更新、削除

## 画面

- 一覧
  - 🟢できていること：ステータスごとにタスクを確認、直近５分間で作られたタスクを確認、ドラッグアンドドロップでタスクのステータスを更新、削除アイコンからタスクの削除
  - ❌できていないこと：タスクのフィルターやソート、無限スクロールやページング対応（バックエンドはとりあえず全部返している）

![タスクの一覧](/assets/list.png)

- 詳細
  - 🟢できていること：タスクの参照、タスクの削除
  - ❌できていないこと：タスク詳細の更新、概要部分をMD化

![タスクの詳細](/assets/detail.png)

- 作成
  - 🟢通常作成、AI作成（タブで制御）

![タスクの作成](/assets/create.png)

## 技術スタック


| ライブラリ | バージョン | 詳細 |
|---|---|---|
| Bun | 1.0.8 | パッケージマネージャー |
| Next.js | 14.1.0 | Reactフレームワーク |
| TypeScript | 5.3.3 | JavaScriptの型付け |
| Mantine | 7.6.1 | React UIコンポーネントライブラリ |
| trpc | 10.45.1 | TypeScript RPCフレームワーク |
| Supabase | 2.39.8 | DB |
| Prisma | 5.10.2 | TypeScript用ORM |
| NextAuth | 4.24.6 | Next.js認証ライブラリ |
| google/generative-ai | 0.3.1 | 生成AI GoogleのGemini |
| Biome | 1.5.3 | lint & format |
| lefthook | 1.6.1 | pre-commit |

### 認証

- `NextAuth`4系、`Auth0`を使用
- `Auth0`内でさまざまな認証プロバイダーを簡単に選択可能でNextAuth内の処理もシンプルになりそうであったこと、認証サービスとして知名度やベストプラクティスとして挙げられているのを目にしていたことを重要視して採用
- 認証の目的は作成者の紐づけ

### タスク管理

- バックエンドを`Supabase`、`Next.js`のAPI Routes、`trpc`、`Prisma`で実装
  - DBは実装の関心事削減や実装工数削減を目的として、使用経験もあった`Supabase`を使用（ほんとは`PlanetScale`を使用していたが有料になるため途中移行作業を行った）
  - `trpc`と`Prisma`は開発をよりタイプセーフにしたい目的で採用
  - また、[T3Stack](https://create.t3.gg/)を採用し環境構築を簡略化
- UIを`Mantine`で実装
  - `Mantine`はTypeScript環境下でのみ使用できるUIコンポーネントライブラリ
  - 実装工数削減、シンプルなUI、タイプセーフな開発、豊富なExample、公式ページで各コンポーネントのカスタマイゼーション、便利なHooks群、formの実装も可能当さまざまな理由から採用
- 作成更新削除系の処理はServerActions、参照はServerComponentsを使用
  - 一部Clientの参照はClientComponentsを使用（タスク詳細）

  <details>

    <summary>ServerActionsとServerComponents</summary>

    - ServerActionsはHTMLのformの機能でServerの関数を実行する仕組みになっているためプログレッシブエンハンスメントを実現できる。プログレッシブエンハンスメントはJavaScriptがなくても画面をインタラクティブに操作可能にするテクニック。ブラウザでのJavaScriptのレンダリングを必要とせずHTMLとCSSのみで必要不可欠な機能を提供することができる。
      - また、ServerActionsのメリットはアクション後のキャッシュのリバリデートやページのリダイレクトをサーバーサイドで行えること。これまで、
        - > クライアント処理(formの状態更新(JS)、バリデーション)->サーバー処理(バリデーション、DB操作、結果返却)->クライアント処理(結果によるUIの状態更新、リダイレクト、リバリデート)
        - の順で行っていたことを、
        - > クライント（form状態更新（HTML））->サーバー（バリデーション、DB操作、結果返却、リバリデート、リダイレクト）->クライアント（必要あればUI更新）
        - のように実現可能になった。そのため処理的にも高速になるうえ、プログレッシブエンハンスメント化でもリバリデートやリダイレクトが行うことができる。
    - ServerComponentsはコンポーネント単位でサーバーでのJSレンダリングを可能とするためデータフェッチングもサーバーサイドで行う。Suspenseとの統合で出来上がったUIからユーザーに操作・閲覧を提供できるためUX向上につながる。

  </details>

## 🙋 アピールポイント

- 今回は「最強のTODOを作って」というクライアントからの要望と仮定して機能を備えて完成させることを目的としました。
- 想定していた機能としては、基本的なCRUDとAIによるタスク自動生成でした。ローカルでは完成しているものの本番環境でAIタスク生成のタイムアウトやReadの処理に時間がかかっている、スケルトンのトランジションが働いてないタイミングがあると課題は残りました。
- **機能**：GeminiマルチモーダルAIを使用しタスクの生成を実現しました。タスクの内容はワンショット学習を使用して、少数例を学習させ似たタスク内容で生成してもらうようにしました。
  - `src/libs/google-cloud/ai/prompt`参照
  - 他にやりたかったこととして、タスク生成後生成したタスク一覧を表示して気に入らなければ再生成をしたり、ストーリーを生成して各タスクのストーリーポイントを算出してもらったりがありました。
- **設計**：フロントとバックすべて`Next.js`+`TypeScript`でミニマルな構成で完結させました。本番環境にVercelを使用する予定だったのでバックエンドも`Next.js`にすることでインフラ面での苦労がかかりませんでした。また`trpc`と`Prisma`の恩恵でかなり型安全な開発ができました。
- **ディレクトリ構成**：基本的にドメイン知識が入るものは共通のものと分ける形にしました。src直下は共通、フロント、バックで分けました。app配下はフロントエンド、server配下はバックエンド、ほかは共通で使用するものを同階層に配置しました。app配下は_featuresにドメイン知識コンポーネントやHooks、ほかは共通コンポーネントやページを配置しました。serverは依存関係はクリーンアーキテクチャ、構造はDDDを部分的に踏襲した形になりました。とくに、service層はactionsとapiどちらでも使用するので重宝しました。また、テスト容易性を考えservice層にrepositoryをDIチックに注入する形を取っています。実装スピードに影響がでない程度の踏襲となったため簡易となっています。Presenter層はあったほうが今後の拡張性や保守性もかなり楽になるかなと思いました。
  > actions or api -> service(domainService) -> repository -> DB
- **実装**：モーダルとドロワー表示はURLで状態を持つようにしました。ブラウザバックやシェアされたときに開いた状態をキープできるためです。
- **テスト**：今回は自動テストの導入はできませんでした。
# Tauri Schedule App

デスクトップ向けのスケジュール管理アプリケーション。Tauri v2とReactを使用して開発されています。

## 技術スタック

- **フロントエンド**
  - React 18
  - TypeScript
  - Chakra UI
  - Vite

- **バックエンド/デスクトップ**
  - Tauri v2
  - Rust

## 開発環境のセットアップ

### 必要条件

- Node.js (18.x以上推奨)
- Rust
- Tauri の開発に必要なシステム依存関係

### インストール

1. リポジトリをクローン:
```bash
git clone https://github.com/zimathon/tauri-schedule-app.git
cd tauri-schedule-app
```

2. フロントエンドの依存関係をインストール:
```bash
cd tauri-app
npm install
```

### 開発サーバーの起動

開発モードでアプリケーションを起動:
```bash
npm run tauri dev
```

### ビルド

プロダクション用にアプリケーションをビルド:
```bash
npm run tauri build
```

## 機能

- スケジュール管理
- カレンダー表示
- タスク管理

## ライセンス

このプロジェクトは現在開発中です。
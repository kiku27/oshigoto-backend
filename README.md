oshigoto-backend（バックエンド側）

概要 「推しのスケジュール管理アプリ」のAPIサーバーです。

主な使用技術

Language: Java
Framework: Spring Boot
Database: PostgreSQL
Environment: Docker
ER図（データベース設計） 
<img width="527" height="508" alt="スクリーンショット 2026-09-23 034947" src="https://github.com/user-attachments/assets/6b8038f0-e134-4452-85a6-dca30e9da984" />


ローカル環境での起動方法

必要環境: Docker Desktop, Git
起動手順:
リポジトリをクローンするため、ターミナルで git clone <バックエンドのGitHubリポジトリのURL> を実行します。
クローンしたプロジェクトのフォルダに移動するため、cd oshigoto-backend を実行します。
Docker環境でコンテナを起動するため、docker compose up -d を実行します。
上記の手順を実行することで、ローカル環境上でAPIサーバーとデータベースが起動します。
